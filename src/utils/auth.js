export const setExpirationInLocalStorage = () => {
  const expiration = new Date();
  console.log(expiration.toISOString());
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem("expiration", expiration.toISOString());
};

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");

  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}
