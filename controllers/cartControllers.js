
const Cart = require('../modal/cartSchema');

// Add product to cart
const addcarts = async (req, res) => {
    try {
        const { title, image, company, price } = req.body;
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({
                message: 'User authentication failed'
            });
        }

        // Check whether this product is already in this user's cart
        const existingProduct = await Cart.findOne({
            title: title,
            user: userId
        });

        if (existingProduct) {
            return res.status(202).json({
                message: 'Product already in cart'
            });
        }

        const cartProduct = await Cart.create({
            title,
            image,
            company,
            price,
            quantity: 1,
            user: userId
        });

        return res.status(201).json({
            message: 'Product added to cart successfully',
            cart: cartProduct
        });

    } catch (error) {
        console.error('Add to cart error:', error);

        return res.status(500).json({
            message: 'Unable to add product to cart',
            error: error.message
        });
    }
};

// Get cart products of logged-in user
const getAllcartProducts = async (req, res) => {
    try {
        const userId = req.user._id;

        const allcartProducts = await Cart.find({
            user: userId
        });

        return res.status(200).json(allcartProducts);

    } catch (error) {
        console.error('Get cart error:', error);

        return res.status(500).json({
            message: 'Unable to fetch cart products',
            error: error.message
        });
    }
};

// Remove product from logged-in user's cart
const removeFromcart = async (req, res) => {
    try {
        const cartID = req.params.id;
        const userId = req.user._id;

        const deletedCart = await Cart.findOneAndDelete({
            _id: cartID,
            user: userId
        });

        if (!deletedCart) {
            return res.status(404).json({
                message: 'Cart product not found'
            });
        }

        return res.status(200).json({
            message: 'Product removed from cart',
            cart: deletedCart
        });

    } catch (error) {
        console.error('Remove cart error:', error);

        return res.status(500).json({
            message: 'Unable to remove cart product',
            error: error.message
        });
    }
};

module.exports = {
    addcarts,
    getAllcartProducts,
    removeFromcart
};
