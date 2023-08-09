export async function readUnit(factionId, unitId) {
  const res = await fetch(`/api/unit/${factionId}/${unitId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readAllFactions() {
  const res = await fetch('/api/factions');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readFaction(factionId) {
  const res = await fetch(`/api/faction/${factionId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readFactionUnits(factionId) {
  const res = await fetch(`/api/faction-units/${factionId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readGenerals(factionId) {
  const res = await fetch(`/api/generals/${factionId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function postSignup(username, password) {
  const obj = { username, password };
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  };
  const res = await fetch('/api/auth/sign-up', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function postSignin(username, password) {
  const obj = { username, password };
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  };
  const res = await fetch('/api/auth/sign-in', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function postGeneral(generalId) {
  const token = JSON.parse(localStorage.getItem('token'));
  const req = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.token}`,
    },
  };
  const res = await fetch(`/api/fav/general/${generalId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function deleteGeneral(generalId) {
  const token = JSON.parse(localStorage.getItem('token'));
  const req = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.token}`,
    },
  };
  const res = await fetch(`/api/delete-general/${generalId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}
