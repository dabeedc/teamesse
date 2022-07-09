const BASE_URL = "http://localhost:3001";

const getErrorMessage = (res) => {
  return {
    status: res.status,
    reason: res.statusText,
  };
};

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw getErrorMessage(res);

  const json = await res.json();
  return json;
};

export const signup = async (userDetails) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });

  if (!res.ok) throw getErrorMessage(res);

  const json = await res.json();
  return json;
}

export const getUserStats = async () => {
  const res = await fetch(`${BASE_URL}/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw getErrorMessage(res);
  const json = await res.json();
  return json;
};
