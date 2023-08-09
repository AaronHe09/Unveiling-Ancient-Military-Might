set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."units" (
	"unitId" serial NOT NULL,
	"unitType" TEXT NOT NULL,
	"unitName" TEXT NOT NULL,
	"weapon" TEXT NOT NULL,
	"armor" TEXT NOT NULL,
  "desc" TEXT not NULL,
	CONSTRAINT "units_pk" PRIMARY KEY ("unitId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."factions" (
	"factionId" serial NOT NULL,
	"factionName" TEXT NOT NULL,
	"factionGroup" TEXT NOT NULL,
	"factionIcon" TEXT NOT NULL,
	"history" TEXT NOT NULL,
	"tactics" TEXT NOT NULL,
	CONSTRAINT "factions_pk" PRIMARY KEY ("factionId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."generals" (
	"generalId" serial NOT NULL,
	"factionId" integer NOT NULL,
	"generalIcon" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"desc" TEXT NOT NULL,
	CONSTRAINT "generals_pk" PRIMARY KEY ("generalId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."userArmy" (
	"userArmyId" serial NOT NULL,
	"generalId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "userArmy_pk" PRIMARY KEY ("userArmyId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."userUnits" (
	"userUnitsId" serial NOT NULL,
	"userId" integer NOT NULL,
	"unitId" integer NOT NULL,
	CONSTRAINT "userUnits_pk" PRIMARY KEY ("userUnitsId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."factionUnits" (
	"factionId" serial NOT NULL,
	"unitId" serial NOT NULL,
	"imageUrl" TEXT NOT NULL,
	CONSTRAINT "factionUnits_pk" PRIMARY KEY ("factionId","unitId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "generals" ADD CONSTRAINT "generals_fk0" FOREIGN KEY ("factionId") REFERENCES "factions"("factionId");

ALTER TABLE "userArmy" ADD CONSTRAINT "userArmy_fk0" FOREIGN KEY ("generalId") REFERENCES "generals"("generalId");
ALTER TABLE "userArmy" ADD CONSTRAINT "userArmy_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "userUnits" ADD CONSTRAINT "userUnits_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "userUnits" ADD CONSTRAINT "userUnits_fk1" FOREIGN KEY ("unitId") REFERENCES "units"("unitId");

ALTER TABLE "factionUnits" ADD CONSTRAINT "factionUnits_fk0" FOREIGN KEY ("factionId") REFERENCES "factions"("factionId");
ALTER TABLE "factionUnits" ADD CONSTRAINT "factionUnits_fk1" FOREIGN KEY ("unitId") REFERENCES "units"("unitId");
