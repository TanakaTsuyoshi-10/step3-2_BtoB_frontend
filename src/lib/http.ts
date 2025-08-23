export const apiFetch = async (path: string, init?: RequestInit) => {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");
  const strip = (p: string) => ("/" + p.replace(/^\/+/, "")).replace(/^\/api\/v1(?=\/|$)/i, "").replace(/\/{2,}/g, "/");
  const url = base + strip(path);
  return fetch(url, init);
};