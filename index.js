
const http = require('http');
const server = http.createServer((req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT;

const cronJob = async()=>{
    const app1 = await axios.get("https://bdslp.onrender.com/",{withCredentials: true})
    const app2 = await axios.get("https://bdslp.onrender.com/",{withCredentials: true})
    
    Promise.all([app1,app2]).then((res)=>{
        console.log(res[0].data);
        console.log(res[1].data);
    })
    .catch((err)=>{
        console.log(err);
    })
}

server.listen(port,()=>{
    setInterval(cronJob, 12000);
    console.log(port);
})