
const express = require('express');

const {
    addProducts,
    getAllProducts
} = require('../controllers/productControllers');

const {
    addFavs,
    getAllfavProducts,
    removeFromFav
} = require('../controllers/favControllers');

const {
    addcarts,
    getAllcartProducts,
    removeFromcart
} = require('../controllers/cartControllers');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

// Product routes
router.post('/addproduct', addProducts);
router.get('/getproducts', getAllProducts);

// Favourite routes
router.post('/addfav', authMiddleware, addFavs);
router.get('/addfav', authMiddleware, getAllfavProducts);
router.delete('/addfav/:id', authMiddleware, removeFromFav);

// Cart routes
router.post('/addcart', authMiddleware, addcarts);
router.get('/addcart', authMiddleware, getAllcartProducts);
router.delete('/addcart/:id', authMiddleware, removeFromcart);

module.exports = router;
