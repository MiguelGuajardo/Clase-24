const { Router } = require("express");
const ProductController = require("../../controllers/productControllers/index")
const router = Router()

router.get("/",ProductController.getProductTest)

module.exports = router