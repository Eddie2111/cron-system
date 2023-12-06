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
app.get("/biglist", (req, res) => {
    res.json(
    [
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
        {message: "a json response", status:200, method:['get',200,21.2,]},
    ]
        );
});
app.get("/empty", (req, res) => {
    res.json({});
});
app.get("/bigjson", (req, res) => {
    res.json(
    {
        message: "a json response",
        status:200,
        method:['get',200,21.2,],
        object:{a:"a", b:"b", c:"c"},
        array:["a","b","c"],
        boolean:true,
        number:123,
        date:new Date(),
        buffer:Buffer.from("whoop"),
        null:null,
        undefined:undefined,
        error:"error",
        html:"<p>some html</p>",
        redirect:"/json",
        notfound:"not found",
        forbidden:"forbidden",
        badrequest:"bad request",
        json:{ message: "a json response", status:200, method:['get',200,21.2,] },
        biglist:[
            {message: "a json response", status:200, method:['get',200,21.2,]},
            {message: "a json response", status:200, method:['get',200,21.2,]},
            {message: "a json response", status:200, method:['get',200,21.2,]},
            {message: "a json response", status:200, method:['get',200,21.2,]},
            {message: "a json response", status:200, method:['get',200,21.2,]},
            {message: "a json response", status:200, method:['get',200,21.2,]},
        ],
        empty:{},
        bigjson:{
            message: "a json response",
            status:200,
            method:['get',200,21.2,],
            object:{a:"a", b:"b", c:"c"},
            array:["a","b","c"],
            boolean:true,
        },
    }
        );
});
app.get("/object", (req, res) => {
    res.json({ message: "a object response", status:200, method:['get',200,21.2,], object:{a:"a", b:"b", c:"c"} });
});

const cronJob = ()=>{
    const app1 = axios.get("https://bdslp.onrender.com/",{withCredentials: true})
    const app2 = axios.get("https://fleetology-auth.onrender.com",{withCredentials: true})
    setInterval(() => {
        Promise.all([app1,app2]).then((res)=>{
            console.log(res[0].data);
            console.log(res[1].data);
        })
        .catch((err)=>{
            //console.log(err);
        })
    }, 6000);
}
setInterval(() => {
    cronJob();
}, 3000);

app.listen(port, ()=>{
    console.log('server at→', port)
    cronJob();
    setInterval(() => {
        cronJob();
    }, 3000);
})
