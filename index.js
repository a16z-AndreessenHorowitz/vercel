const express = require('express')
const methodOverride = require('method-override')//method-override
const bodyParser = require('body-parser')
require ( 'dotenv' ) .config ()
const session = require('express-session');
const flash = require('express-flash');
const path=require('path')
const cookieParser = require('cookie-parser');


const database=require('./config/database')

const systemConfig=require('./config/system.js')

const routeAdmin=require("./routes/admin/index.route.js")
const route=require("./routes/client/index.route.js")

database.connect()

const app = express()


const port = process.env.PORT;

app.use(methodOverride('_method')) //method-override

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(`${__dirname}/public`));

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

//time cme
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//time cme

//flash
app.use(session({
  secret: 'MHUY231',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
//end flash

// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin




routeAdmin(app)
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
