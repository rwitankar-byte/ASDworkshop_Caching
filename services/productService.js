const {readProducts,writeProducts} = require('../database/productDatabase');

async function getAllProducts() {
  return await readProducts();
}

async function getProductById(id) {
  const products = await readProducts();

  return products.find((product) => product.id === id);
}

async function createProduct(productData) {
  const products = await readProducts();

  const newId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;

  const newProduct = {
    id: newId,
    ...productData
  };

  products.push(newProduct);

  await writeProducts(products);

  return newProduct;
}

async function updateProduct(id, productData) {
  const products = await readProducts();

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...productData,
    id: id
  };

  await writeProducts(products);

  return products[index];
}

async function deleteProduct(id) {
  const products = await readProducts();

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return null;
  }

  const deletedProduct = products[index];

  products.splice(index, 1);

  await writeProducts(products);

  return deletedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};