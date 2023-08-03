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
