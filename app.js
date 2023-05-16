const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000

const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env'})

connectDB()

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

// Routes
app.use('/', require('./routes/index'))
//!!! Ended Mayan Wolfe's stream @ 3:16:24

app.listen(
  PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)