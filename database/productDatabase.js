const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'db.json');

async function readProducts() {
  const data = await fs.readFile(filePath, 'utf-8');
  const products = JSON.parse(data);

  if (!Array.isArray(products)) {
    throw new Error('Product data must be an array');
  }

  return products;
}

async function writeProducts(products) {
  if (!Array.isArray(products)) {
    throw new TypeError('Products must be an array');
  }

  await fs.writeFile(
    filePath,
    `${JSON.stringify(products, null, 2)}\n`
  );
}

module.exports = {
  readProducts,
  writeProducts
};