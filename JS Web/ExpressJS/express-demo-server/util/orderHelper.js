module.exports = {
    getOrderStatus: (order) =>{
        if (order.status === 'Pending') {
            order.isPending = true
            order.isInProgress = false
            order.isInTransit = false
            order.isDelivered = false
        } else if (order.status === 'In progress') {
            order.isPending = false
            order.isInProgress = true
            order.isInTransit = false
            order.isDelivered = false
        } else if (order.status === 'In transit') {
            order.isPending = false
            order.isInProgress = false
            order.isInTransit = true
            order.isDelivered = false
        } else if (order.status === 'Delivered') {
            order.isPending = false
            order.isInProgress = false
            order.isInTransit = false
            order.isDelivered = true
        }
    }
       
};