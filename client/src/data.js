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
