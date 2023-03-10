const {faker} = require("@faker-js/faker")


const createFakeProducts = (qty) => {
    const listProducts = []
    for (let i = 0; i < qty; i++) {
        const product = {
            name: faker.commerce.product(),
            price: faker.commerce.price(),
            img: faker.image.business(200, 200)
        }
        listProducts.push(product)
    }
    return listProducts

}


module.exports = createFakeProducts