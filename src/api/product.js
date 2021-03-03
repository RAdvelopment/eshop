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
