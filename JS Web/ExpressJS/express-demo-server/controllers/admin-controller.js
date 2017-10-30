const Product = require('mongoose').model('Product');
const Order = require('mongoose').model('Order');
const orderHelper = require('../util/orderHelper');

module.exports = {
    createProductView: (req, res) => {
        res.render('admin/createProduct')
    },

    createProduct: (req, res) => {
        let category = req.body.category;
        let imageUrl = req.body.imageUrl;
        let size = req.body.size;
        if (size < 17) {
            return res.render('admin/createProduct', { successMessage: 'Size must be larger than 17' })
        }
        if (size > 24) {
            return res.render('admin/createProduct', { successMessage: 'Size must be smaller than 24' })
        }
        let toppings = []
        for (let topping of req.body.toppings.split(',')) {
            toppings.push(topping);
        }
        let productObj = {
            category: category,
            imageUrl: imageUrl,
            size: req.body.size,
            toppings: toppings
        }

        Product.create(productObj).then((prod) => {

            res.render('admin/createProduct', { successMessage: 'Product created' })

        }).catch(err => {
            res.locals.globalError = err.message
            res.render('admin/createProduct')
        })
    },
    getAllOrders: (req, res) => {
        Order.find({}).populate('product').then(orders => {
            for (let order of orders) {
                orderHelper.getOrderStatus(order)
                order.save()
            }
            res.render('admin/allOrders', { orders })
        })
    },
    saveChanges: (req, res) => {
        let selections = req.body;
        Order.find({}).populate('product').then(orders => {
            for (let order of orders) {
                let newStatus = selections[order._id]
                order.status = newStatus
                orderHelper.getOrderStatus(order)
                order.save();
            }
            res.render('admin/allOrders', { orders ,successMessage: 'Changes saved!'})
        })
    }
};