const express = require('express')
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser') 
const path = require('path');


const app = express()
let PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));



app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/submit', (req, res) => {
    //console.log(req.body)
    const confirmation = ["Message has been received", req.body]
    res.json(confirmation);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

