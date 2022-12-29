const cookieParser = require("cookie-parser")

const logInUser = (req, res) => {
    try {
        res.render('login.hbs')
    } catch (error) {
        console.log(`error from logInUser - ${error}`);
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
    try {
        const userName = req.body.user
        const sessionId = req.session.id
        req.session.user = userName
        console.log('id de session: ', sessionId);
        if(req.session.user){
            res.render('products.hbs',{userName})
            console.log(`se conectó el usuario ${userName}`)
        }else{
            res.render("login.hbs")
            console.log("Por favor rellene el campo usuario")
        }
    } catch (error) {
        console.log(`Error desde el postLogIn`, error);
    }
}

module.exports = {logInUser,logOutUser,postLogIn,logOutRedirect}