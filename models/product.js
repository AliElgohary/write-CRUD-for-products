import fetch from "node-fetch";

const _fetch = (url, method = "GET", { body, headers } = {}) =>
  fetch(url, {
    method,
    body,
    headers,
  }).then((res) => res.json());

const fetchProducts = async () =>
  _fetch("https://api.escuelajs.co/api/v1/products?offset=1&limit=10");

const fetchRate = async (curr) =>
  _fetch("https://api.exchangerate.host/latest?base=USD").then(
    (res) => res.rates[curr]
  );

const createProduct = async (product) => {
  return _fetch("https://api.escuelajs.co/api/v1/products/", "POST", {
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const fetchProductById = async (id) =>
  _fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

const updateProduct = async (productId, updatedProduct) => {
  return _fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
    "PUT",
    {
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteProduct = async (productId) => {
  return _fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
    "DELETE"
  );
};

export { fetchProducts, fetchRate, createProduct, fetchProductById, updateProduct, deleteProduct };