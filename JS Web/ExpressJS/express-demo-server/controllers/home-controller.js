const Product = require('mongoose').model('Product')

module.exports = {
    index: (req, res) => {
        let beefDoners = []

        let chickenDoners = []

        let lambDoners = []

        Product.find({ category: 'beef' }).then(foundBeef => {
            Product.find({ category: 'chicken' }).then(foundChicken => {
                Product.find({ category: 'lamb' }).then(foundLamb => {
                    res.render('home/index', { foundChicken, foundLamb, foundBeef });
                })
        })
})
    },
about: (req, res) => {
    res.render('home/about');
}
};