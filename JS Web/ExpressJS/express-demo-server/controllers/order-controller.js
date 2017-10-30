const Product = require('mongoose').model('Product')
const Order = require('mongoose').model('Order')
const User = require('mongoose').model('User')

module.exports = {
    customizeOrderView: (req, res) => {
        let productId=(req.query.id)
        Product.findById(productId).then(product=>{
            res.render('order/customizeOrder',{product})
        })
    },
    checkout:(req,res)=>{
        let product=req.body.productId
        let toppings = req.body.toppings
        let user = req.user._id
        let orderObj={
            user: user,
            product: product,
            toppings:toppings,
        }
        Order.create(orderObj).then(ord=>{
            User.findById(user).then(user=>{
                user.orders.push(ord._id)
                user.save();
                res.redirect(`/orderDetails?id=${ord._id}`)
            })
        })
    },

    orderStatusView:(req,res)=>{
        let userId=(req.query.id)
        User.findById(userId).populate({path: 'orders',populate:{path:'product'}}).then(user=>{
            let ordersArray=[]
            for(let order of user.orders){
                
                ordersArray.push(order)
            }
            if(ordersArray.length===0){
                res.render('order/orderStatus')
            }else{
             res.render('order/orderStatus',{ordersArray})
            }
        })

    },
    orderDetails(req,res){
        let orderId= req.query.id
        Order.findById(orderId).populate('product').then(order=>{
            if(order.status==='Pending'){
                order.isPending=true
            }else if(order.status==='In progress'){
                order.isInProgress=true
            }else if(order.status ==='In transit'){
                order.isInTransit=true
            }else if(order.status==='Delivered'){
                order.isDelivered=true
            }
            res.render('order/orderDetails',{order})
        })
    }
};