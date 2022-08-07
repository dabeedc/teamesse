export const getBaseUrl = () =>
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";