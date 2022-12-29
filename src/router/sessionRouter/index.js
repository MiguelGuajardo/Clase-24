const { Router } = require("express");
const SessionController = require("../../controllers/sessionControllers/index");

const router = Router()

router.get("/login", SessionController.logInUser)

router.post("/login", SessionController.postLogIn)

router.get("/logOut", SessionController.logOutRedirect)

router.post("/logOut", SessionController.logOutUser)

module.exports = router