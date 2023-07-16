const path = require('path')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')



const PORT = process.env.PORT || 3000

const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

// Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars
//! Add the word .engine after exphbs
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs'
  })
)
app.set('view engine', '.hbs')

// Sessions middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folder
app.use(express.static(path.join(__dirname, 
  'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


app.listen(
  PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

//Continue from 4:50:00, Mayan Wolfe's stream