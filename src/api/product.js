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
