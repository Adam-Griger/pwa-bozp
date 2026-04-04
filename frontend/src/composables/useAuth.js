export function useAuth() {
  function getTokenPayload() {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch {
      return null
    }
  }

  function getRole() {
    return getTokenPayload()?.role ?? null
  }

  function getUserId() {
    return getTokenPayload()?.userId ?? null
  }

  function logout(router) {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return { getRole, getUserId, logout }
}
