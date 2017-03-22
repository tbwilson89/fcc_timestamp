var express = require ('express')

var express = require('express')
var app = express()

var unixData = null;
var natData = null;
var regex = /./
var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

app.get('/', function (req, res) {
  console.log(req.query.data)
  if(/^\/0-9/.test(req.query.url)){
    console.log('this is working!')
  }
  res.send('This is the home site, please enter a data or unix code into the address!')
})
app.get(/^\/./, function(req, res){
  var newRequest = req.url.replace(/%20|\//, '')
  if(!isNaN(newRequest)) {
    console.log('works')
    var unixDate = newRequest
    var natDate = new Date(unixDate * 1000)
    var thisDate = monthName[natDate.getMonth()] + ' ' + natDate.getDate() + ', ' + natDate.getFullYear()
    console.log(natDate, unixDate)
    res.send({ "unix": unixDate, "natural": thisDate })
  } else {
    var newUnixDate = Date.parse(req.url)
    var newNatDate = new Date(newUnixDate)
    var thisDate = monthName[newNatDate.getMonth()] + ' ' + newNatDate.getDate() + ', ' + newNatDate.getFullYear()
    if (newUnixDate){
      console.log(newUnixDate)
      var data = { "unix": newUnixDate /1000, "natural": thisDate }
    } else {
      var data = { "unix": null, "natural": null }
    }
    res.send(data)
  }
  
})
app.get('/test', function (req, res){
    res.send('This is the test page!')
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})