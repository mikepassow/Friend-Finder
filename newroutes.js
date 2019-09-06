const express = require("express");
const app = express();
const bodyParser= require("body-parser")

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
let people = [
    {
        id: 1,
        name: "mike"
    },
    {
        id: 2,
        name:"Phil"
    }
];


app.get('/', function(req, res){
    res.status(200).send(people);
});
app.post("/", function(req, res){
    console.log(req)
    console.log(req.body);
    res.send(req.body)
})

app.listen(5000, function(){
    console.log("connected")
})