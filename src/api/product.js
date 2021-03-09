export async function getProductApi() {
  const url = "http://localhost:27017/eshop/get-product";
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteProductApi(id) {
  const url = `http://localhost:27017/eshop/delete-product/${id}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = response.json;
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function createProductApi(data) {
  const url = `http://localhost:27017/eshop/post-product`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, params);
    const result = response.json;
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateProductApi(body, id) {
  const url = `http://localhost:27017/eshop/update-product/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, params);
    const result = response.json;
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getProductIdApi(id) {
  const url = `http://localhost:27017/eshop/get-product/${id}`;
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
  } catch (error) {
    console.log(error.message);
  }
}

export async function postProductSelledApi(data) {
  const url = "http://localhost:27017/eshop/post-selled";

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductSelledApi() {
  const url = "http://localhost:27017/eshop/get-selled";

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
  } catch (error) {
    console.log(error);
  }
}
