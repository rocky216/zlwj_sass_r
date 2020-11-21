const path = require("path");
const express = require("express");
const ejs = require("ejs");
var proxyMiddleWare = require("http-proxy-middleware").createProxyMiddleware;

const project = process.env.NODE_PROJECT;
const app = express();



app.use(express.static( path.resolve(__dirname, "../build") ));

app.set('view engine','ejs');
app.engine("html", ejs.__express);

app.use("/zlwj/api",proxyMiddleWare({
  target:"/",
  changeOrigoin:true,
  pathRewrite: {'^/zlwj/api' : '/zlwj/api'},
}));

app.set('views', path.resolve(__dirname, "../build"));
app.get(`/${project}`, (req, res)=>{
  res.render(`${project}.html`)
})


app.listen(3000, ()=>{
  
  
})
