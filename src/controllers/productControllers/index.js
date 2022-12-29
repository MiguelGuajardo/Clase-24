const createFakeProducts = require("../../utils/faker-products")

const getProductTest = async (req,res)=>{
    try {
        const products = createFakeProducts(5)
        await res.render('products.hbs', {
            products
        })
        /* await res.send({success: true, data: products}) */
    } catch (error) {
        console.log(error, `error from getProductsTest`);
        res.send({ success: false, data: undefined, message: 'products not found' })
    }
}
module.exports = {getProductTest}