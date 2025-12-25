export const API_BASE = import.meta.env.VITE_API_URL;

export async function testBackend() {
  const res = await fetch(`${API_BASE}/protected`, {
    headers: {
      Authorization: "Bearer INVALID_TOKEN",
    },
  });

  return res.json();
}
