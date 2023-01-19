const cookieParser = require("cookie-parser")

const logInUser = (req, res) => {
    const userName = req.session.user
    if(req.session?.user){
        res.render('products.hbs',{userName})
        console.log(`se conectó el usuario ${userName}`)
    }else{
        res.render("login.hbs")
        console.log("Por favor rellene el campo usuario")
    }
}

const logOutUser = (req, res) => {
    try {
        const userName = req.session.user
        const sessionId = req.session.id
        console.log('id de session: ', sessionId);
        res.render('logout.hbs', {
            userName
        })
        req.session.destroy(err => {
            if (err) {
                res.send({status: 'Logout ERROR', body: err })
            } else {
                console.log('Logout ok!')
            }
        })
    } catch (error) {
        console.log(`error from logOutUser - ${error}`);
    }
}
const logOutRedirect = (req,res)=>{
    res.render("login.hbs")
}

const postLogIn = (req, res) => {
        const userName = req.body.user
        const sessionId = req.session.id
        req.session.user = userName
        console.log('id de session: ', sessionId);
        res.redirect("/login")
}

module.exports = {logInUser,logOutUser,postLogIn,logOutRedirect}