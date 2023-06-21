const express = require('express')
const web = require('./routers/web')
const api = require('./routers/api')
const app = express()
const port = 3500
const fileupload = require("express-fileupload")
const cloudinary = require('cloudinary');
app.use(fileupload({ useTempFiles: true }));

const session = require('express-session')
const flash = require('connect-flash')

const cookieParser = require('cookie-parser')
app.use(cookieParser())
// body parser require
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//messages
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

//database connection
const connectDB = require('./db/connectdb')
connectDB()

//routing
app.use('/', web)
//localhost:3500

// api routing
app.use('/api',api)
//localhost:3500/api

//ejs template
app.set('view engine', 'ejs')

//static file setup
app.use(express.static('public'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
