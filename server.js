const express = require('express')
const http = require('http')
const path = require('path')
var bodyParser = require('body-parser')
let app = express()

// server port and static page
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
} else {
  // local development
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.use(bodyParser.json())
const port = process.env.PORT || '8080'
app.set('port', port)
const server = http.createServer(app)
server.listen(port, () => console.log(`Running on localhost:${port}`))

// user Auth / firebase admin
var admin = require('firebase-admin');
const secret_info = require('./secret_info')
try {
  admin.initializeApp({
    credential: admin.credential.cert(secret_info.service),
    databaseURL: secret_info.firebaseDatabaseURL
  })
} catch (error) {
  console.log("Error initializing firebase admin")
  console.log(error.message)
}
module.exports = {admin}

// API routes
const routes = require('./routes')
app.use('/api/v2', routes)

// serve correct static page
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
