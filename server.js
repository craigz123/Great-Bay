const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require("body-parser");
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.get("/contact", (req, res) => {
    res.send("This is our contact route")
})

app.post('/item', (req, res)=> {
    console.log(req.body);
    res.send(req.body);
})


app.listen(PORT, () => {
    console.log("Listening on PORT : " + PORT)
})