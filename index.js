const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const url = process.env.MONGO_URI
const swaggerDocumentations = require('./config/documentations')
const swaggerDocs = require('swagger-ui-express')

// Routes
const finderRoutes = require("./routes/finder.routes")
const schoolRoutes = require("./routes/school.routes")
const searchRoutes = require("./routes/search.routes")







const port = process.env.PORT

app.listen(port, () => {
    
    console.log(`Api Server Started at Port ${port}`)
})

// Connect to the DataBase

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Connected to DataBase Successfully")
})
    .catch((error) => {
    console.log("Could Not Connect DataBase",error)
    })



// MiddleWares
app.set("view engine","ejs")
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/docs',swaggerDocs.serve)
app.use('/docs', swaggerDocs.setup(swaggerDocumentations))
app.use(cors())


app.get("/", (request, response) => {
    response.render("confirmEmail")
})




// Use Api Routes
app.use("/v1",finderRoutes)
app.use("/v1",schoolRoutes)
app.use("/v1",searchRoutes)