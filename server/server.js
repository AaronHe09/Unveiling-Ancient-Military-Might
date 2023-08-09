import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import ClientError from './lib/client-error.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { authorizationMiddleware } from './lib/authorization-middleware.js';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/generals/:factionId', async (req, res, next) => {
  try {
    const { factionId } = req.params;
    if (!factionId) {
      throw new ClientError(401, 'factionId is required');
    }
    const sql = `
      SELECT *
      FROM "generals"
      WHERE "factionId" = $1
    `;
    const params = [factionId];
    const result = await db.query(sql, params);
    if (!result.rows) {
      throw new ClientError(401, 'Invalid Id');
    }
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/unit/:factionId/:unitId', async (req, res, next) => {
  try {
    const { factionId, unitId } = req.params;
    if (!factionId || !unitId) {
      throw new ClientError(401, 'factionId and UnitId are required');
    }
    const sql = `
      SELECT *
      FROM "factionUnits"
      JOIN "factions" USING ("factionId")
      JOIN "units" USING ("unitId")
      WHERE "factionId" = $1
      AND "unitId" = $2;
    `;
    const params = [factionId, unitId];
    const result = await db.query(sql, params);
    const [unit] = result.rows;
    if (!unit) {
      throw new ClientError(401, 'Invalid Id');
    }
    res.json(unit);
  } catch (err) {
    next(err);
  }
});

app.get('/api/faction-units/:factionId', async (req, res, next) => {
  const { factionId } = req.params;
  if (!factionId) {
    throw new ClientError(401, 'factionId and UnitId are required');
  }
  try {
    const sql = `
    SELECT *
    FROM "factionUnits"
    JOIN "units" USING ("unitId")
    WHERE "factionId" = $1
    `;
    const params = [factionId];
    const result = await db.query(sql, params);
    if (!result.rows) {
      throw new ClientError(401, 'Invalid Id');
    }
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/faction/:factionId', async (req, res, next) => {
  const { factionId } = req.params;
  if (!factionId) {
    throw new ClientError(401, 'factionId and UnitId are required');
  }
  try {
    const sql = `
    SELECT *
    FROM "factions"
    WHERE "factionId" = $1
    `;
    const params = [factionId];
    const result = await db.query(sql, params);
    if (!result.rows) {
      throw new ClientError(401, 'Invalid Id');
    }
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/factions', async (req, res, next) => {
  try {
    const sql = `
    select *
    from "factions"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get(
  '/api/user-unit/:unitId/:factionId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ClientError(401, 'not logged in');
      }
      const { unitId, factionId } = req.params;
      const sql = `
    select *
    from "userUnits"
    where "userId" = $1
    and "unitId" = $2
    and "factionId" = $3
    `;
      const params = [req.user.userId, unitId, factionId];
      const result = await db.query(sql, params);
      const [unit] = result.rows;
      if (!unit) throw new ClientError(404, `Unit with id ${unitId} not found`);
      res.status(201).json(unit);
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  '/api/user-general/:generalId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ClientError(401, 'not logged in');
      }
      const { generalId } = req.params;
      const sql = `
    select *
    from "userArmy"
    where "userId" = $1
    and "generalId" = $2
    `;
      const params = [req.user.userId, generalId];
      const result = await db.query(sql, params);
      const [general] = result.rows;
      if (!general)
        throw new ClientError(404, `Unit with id ${generalId} not found`);
      res.status(201).json(general);
    } catch (err) {
      next(err);
    }
  }
);

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
    insert into "users" ("username", "hashedPassword")
    values ($1, $2)
    returning *
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
    select "userId", "hashedPassword"
    from "users"
    where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) throw new ClientError(401, 'invalid username');
    const { userId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) throw new ClientError(401, 'invalid password');
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.status(200).json({ payload, token });
  } catch (err) {
    next(err);
  }
});

app.post(
  '/api/fav/general/:generalId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ClientError(401, 'not logged in');
      }
      const { generalId } = req.params;
      const sql = `
    insert into "userArmy" ("userId", "generalId")
    values($1, $2)
    returning *
    `;
      const params = [req.user.userId, generalId];
      const result = await db.query(sql, params);
      const [general] = result.rows;
      if (!general)
        throw new ClientError(404, `General with id ${generalId} not found`);
      res.status(201).json(general);
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  '/api/fav/unit/:unitId/:factionId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ClientError(401, 'not logged in');
      }
      const { unitId, factionId } = req.params;
      const sql = `
    insert into "userUnits" ("userId", "unitId", "factionId")
    values($1, $2, $3)
    returning *
    `;
      const params = [req.user.userId, unitId, factionId];
      const result = await db.query(sql, params);
      const [general] = result.rows;
      if (!general)
        throw new ClientError(404, `Unit with id ${unitId} not found`);
      res.status(201).json(general);
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  '/api/delete-general/:generalId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      if (!req.user) throw new ClientError(401, 'not logged in');
      const { generalId } = req.params;
      const sql = `
    delete from "userArmy"
    where "userId" = $1
    and "generalId" = $2
    returning *
    `;
      const params = [req.user.userId, generalId];
      const result = await db.query(sql, params);
      const [deleted] = result.rows;
      if (!deleted)
        throw new ClientError(404, `General with id ${generalId} not found`);
      res.status(201).json(deleted);
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  '/api/delete-unit/:unitId/:factionId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      if (!req.user) throw new ClientError(401, 'not logged in');
      const { unitId, factionId } = req.params;
      const sql = `
    delete from "userUnits"
    where "userId" = $1
    and "unitId" = $2
    and "factionId" = $3
    returning *
    `;
      const params = [req.user.userId, unitId, factionId];
      const result = await db.query(sql, params);
      const [deleted] = result.rows;
      if (!deleted)
        throw new ClientError(404, `Unit with id ${unitId} not found`);
      res.status(201).json(deleted);
    } catch (err) {
      next(err);
    }
  }
);

app.delete('/api/delete-user/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new ClientError(400, `userId is required`);
    }
    const sql = `
      delete from "users"
      where "userId" = $1
      returning *
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    const [deleted] = result.rows;
    if (!deleted) {
      throw new ClientError(404, `Entry with id ${userId} is not found`);
    }
    res.status(204).json(deleted);
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
