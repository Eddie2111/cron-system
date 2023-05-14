const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');


app.use(cors({origin: true, credentials: true, methods: ['GET', 'POST']}));

const port = process.env.PORT;

app.get('/', (req, res)=>{
    res.send('hello world')
})
app.get("/string", (req, res) => {
    res.send("a normal string");
});
app.get("/list",(req,res)=>{
    res.send(["a","b","c"])
})
app.get("/array",(req,res)=>{
    res.send(["a","b","c"])
})
app.get("/boolean", (req, res) => {
    res.send(true);
});
app.get("/number", (req, res) => {
    res.send(123);
});
app.get("/date", (req, res) => {
    res.send(new Date());
});
app.get("/buffer", (req, res) => {
    res.send(Buffer.from("whoop"));
});
app.get("/null", (req, res) => {
    res.send(null);
});
app.get("/undefined", (req, res) => {
    res.send(undefined);
});
app.get("/error", (req, res) => {
    res.status(500);
    res.send("error");
});
app.get("/html", (req, res) => {
    res.send("<p>some html</p>");
});
app.get("/redirect", (req, res) => {
    res.redirect("/json");
});
app.get("/notfound", (req, res) => {
    res.status(404);
    res.send("not found");
});
app.get("/forbidden", (req, res) => {
    res.status(403);
    res.send("forbidden");
});
app.get("/badrequest", (req, res) => {
    res.status(400);
    res.send("bad request");
});
app.get("/json", (req, res) => {
    res.json({ message: "a json response", status:200, method:['get',200,21.2,] });
});
app.get("/object", (req, res) => {
    res.json({ message: "a object response", status:200, method:['get',200,21.2,], object:{a:"a", b:"b", c:"c"} });
});

const cronJob = async()=>{
    const app1 = await axios.get("https://bdslp.onrender.com/",{withCredentials: true})
    const app2 = await axios.get("https://bdslp.onrender.com/",{withCredentials: true})
    
    Promise.all([app1,app2]).then((res)=>{
        //console.log(res[0].data);
        //console.log(res[1].data);
    })
    .catch((err)=>{
        //console.log(err);
    })
}

app.listen(port, ()=>{
    console.log('server at→', port)
    cronJob();
})