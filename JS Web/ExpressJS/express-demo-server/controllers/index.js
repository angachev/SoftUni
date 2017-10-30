const home = require('./home-controller');
const user = require('./user-controller');
const admin = require('./admin-controller');
const order=require('./order-controller')

module.exports = {
    home,
    user,
    admin,
    order
};