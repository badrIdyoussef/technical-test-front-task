/** Auth façade — TODO: implémentez une vraie logique côté front (sessionStorage, etc.) */

const AUTH_KEY = 'auth_session_token';

export function isAuthed(): boolean {
  return !!localStorage.getItem(AUTH_KEY);
}
export function setToken(_email: string) {
  // TODO
  localStorage.setItem(AUTH_KEY, 'simulated_jwt_token_12345');
  console.log('User session token set successfully.');
}
export function clearToken() {
  // TODO
  localStorage.removeItem(AUTH_KEY);
  console.log('User session token cleared.');
}


export function getToken(): string | null {
  return localStorage.getItem(AUTH_KEY);
}