export async function SignUpApi(data) {
  const url = "http://localhost:27017/eshop/sign-up";
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}

export async function SignInApi(data) {
  const url = `http://localhost:27017/eshop/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}

export async function getUsersApi() {
  const url = `http://localhost:27017/eshop/get-users`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}
