const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);


    app.get('/createProduct',controllers.admin.createProductView)
    app.post('/createProduct',controllers.admin.createProduct)


    app.get('/customizeOrder', controllers.order.customizeOrderView)
    app.post('/customizeOrder', controllers.order.checkout)
    app.get('/orderStatus', controllers.order.orderStatusView)
    app.get('/orderDetails',controllers.order.orderDetails)

    app.get('/allOrders', controllers.admin.getAllOrders)
    app.post('/allOrders', controllers.admin.saveChanges)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};