const productService = require('../services/productService');

const {
  storeCache
} = require('../middleware/cacheMiddleware');


// GET /products
async function getProducts(req, res) {
  try {
    const products = await productService.getAllProducts();

    storeCache(req, products);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products:', error);

    res.status(500).json({
      error: 'Failed to fetch products'
    });
  }
}


// GET /products/:id
async function getProductById(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: 'Invalid product ID'
      });
    }

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    storeCache(req, product);

    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product:', error);

    res.status(500).json({
      error: 'Failed to fetch product'
    });
  }
}


// POST /products
async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);

    res.status(500).json({
      error: 'Failed to create product'
    });
  }
}


// PUT /products/:id
async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: 'Invalid product ID'
      });
    }

    const product = await productService.updateProduct(
      id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);

    res.status(500).json({
      error: 'Failed to update product'
    });
  }
}


// PATCH /products/:id
async function patchProduct(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: 'Invalid product ID'
      });
    }

    const product = await productService.updateProduct(
      id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error patching product:', error);

    res.status(500).json({
      error: 'Failed to update product'
    });
  }
}


// DELETE /products/:id
async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: 'Invalid product ID'
      });
    }

    const product = await productService.deleteProduct(id);

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error deleting product:', error);

    res.status(500).json({
      error: 'Failed to delete product'
    });
  }
}


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};