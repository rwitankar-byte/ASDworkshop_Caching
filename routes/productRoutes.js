const express = require('express');

const router = express.Router();

const productController = require('../controller/productController');

const {
  cacheMiddleware,
  invalidateCache
} = require('../middleware/cacheMiddleware');


// GET all products
router.get('/products',cacheMiddleware,productController.getProducts);


// GET product by ID
router.get('/products/:id',cacheMiddleware,productController.getProductById);


// POST product
router.post('/products',invalidateCache,productController.createProduct);


// PUT product
router.put('/products/:id',invalidateCache,productController.updateProduct);


// PATCH product
router.patch('/products/:id',invalidateCache,productController.patchProduct);


// DELETE product
router.delete('/products/:id',invalidateCache,productController.deleteProduct);


module.exports = router;