export function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}
