// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

const port = 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
const { response } = require('express')
app.use(cors({ optionsSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' })
})

app.get('/api/timestamp/', (req, res) => {
  console.log('empty string')
  const date = new Date()
  res.json({ unix: date.getTime(), utc: date.toUTCString() })
})

//Note date_string is a URL parameter
app.get("/api/timestamp/:date_string", (req, res) => {
  const regexTestNonDigit = /[\D]/
  const regextTestUTC = /\d{4}-\d{2}-\d{2}/
  const regextTestNonDigitOtherThanDash = /[^0-9-]/

  //res.send(req.params.date_string)
  if (regextTestUTC.test(req.params.date_string) && regextTestNonDigitOtherThanDash.test(req.params.date_string) === false) {
    console.log({ params: 'utc' })
    const date = new Date(req.params.date_string)
    res.json({ unix: date.getTime(), utc: date.toUTCString() })
  } else if (regexTestNonDigit.test(req.params.date_string) === false) {
    console.log({ params: 'unix' })
    const date = new Date(parseInt(req.params.date_string))
    res.json({ unix: date.getTime(), utc: date.toUTCString() })
  } else {
    console.log({ params: 'invalid' })
    res.json({ error: 'Invalid Date' })
  }
})

// listen for requests :)
/*
var listener = app.listen(process.env.PORT, () => {
  console.log(process.env.PORT)
  console.log('Your app is listening on port ' + listener.address().port);
});
*/

const listener = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})