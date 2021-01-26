const path = require("path");
const express = require("express");
const ejs = require("ejs");
var proxyMiddleWare = require("http-proxy-middleware").createProxyMiddleware;
var compression = require('compression');

const project = process.env.NODE_PROJECT;
const app = express();

app.use(compression());

app.use(express.static( path.resolve(__dirname, "build") ));

app.set('view engine','ejs');
app.engine("html", ejs.__express);

app.use("/zlwj/api",proxyMiddleWare({
  target:"/",
  changeOrigoin:true,
  pathRewrite: {'^/zlwj/api' : '/zlwj/api'},
}));

app.set('views', path.resolve(__dirname, "build"));

app.get(`/`, (req, res)=>{
  res.render("sass.html")
})
app.get(`/admin`, (req, res)=>{
  res.render("admin.html")
})
app.get(`/power`, (req, res)=>{
  res.render("power.html")
})

app.get(`/plate`, (req, res)=>{
  res.render("plate.html")
})


app.listen(3001, ()=>{
  
  
})
