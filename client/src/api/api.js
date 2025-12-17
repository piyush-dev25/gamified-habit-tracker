const API_BASE = "http://localhost:5000/api";

export async function testBackend() {
  const res = await fetch(`${API_BASE}/protected`, {
    headers: {
      Authorization: "Bearer INVALID_TOKEN",
    },
  });

  return res.json();
}
