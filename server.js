const express = require("express")
const session = require("express-session")
const handlebars = require("express-handlebars")
const MongoStore = require("connect-mongo")
const {config} = require("./src/config/index")
const {ProductRouter,SessionRouter} = require("./src/router/routes")
const path = require("path")
const mongoose = require("mongoose")
const Product = require("./src/models/productModel")
const app = express()
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const cookieParser = require("cookie-parser")
app.use(cookieParser())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(process.cwd() + './public')))
/* Handlebars config */
const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'main.hbs',
}
app.set('view engine', 'hbs')
app.set('views', './public/views');
app.engine('hbs', handlebars.engine(handlebarsConfig))
app.use(express.static("public"));



const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const sessionConfig ={
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.MONGO_DB_NAME,
        mongoOptions,
        ttl: 60,
        collectionName: 'sessions'
    }),
    secret: `${process.env.CODE_SECRET}`,
    resave: false,
    saveUninitialized: false,
    rolling:true,
    cookie: {
        maxAge:60000
    }
}
app.use(session(sessionConfig))

app.use("/", SessionRouter)
app.use('/products', ProductRouter)


mongoose.set('strictQuery', false)
mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser:true, useUnifiedTopology:true, },()=>{
    console.log("Connected to database!")
})

io.on("connection", async (socket) => {

/* PRODUCTOS */

try {
    const products = await Product.find({})
    socket.emit("productosActualizados",products)

    socket.on("nuevoProducto", async(product) => {
        const newProduct = new Product(product)
       newProduct.save()
       .then(result =>{
        console.log(result)
       })
       .catch(err=>{
        console.log(err)
       })
       const products = await Product.find({})
       socket.emit("productosActualizados",products)
      })

  } catch (error) {
    console.log(error)
  }
})

const server = httpServer.listen(config.SERVER.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  });
  server.on("error", (error) => console.log(`Error en servidor ${error}`));