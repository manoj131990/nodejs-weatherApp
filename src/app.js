const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const Forcast =require('./utils/forcast');
const port = process.env.PORT || 3000
app.set("views", path.join(__dirname, "../templates/views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
let message = `If you want to captivate a website visitor who comes to your site knowing little or nothing about your brand, nothing is more important than nailing your homepage messaging. You have just seconds to convince the user not to abandon your site. The main message is one of the most prominent elements on the homepage, and if it doesn't appeal to users within those precious few seconds, they're going to bounce. So how do you write a main message that compels users to stay on your site longer than a few seconds?`;
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Manoj Sawant",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Manoj Sawant",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: message,
    name: "Manoj Sawant",
  });
});
app.get("/weather", (req, res) => {
 if(!req.query.address){
   return res.send({
     error:'Please provide address to get weather details'
   })
 }
 let address=req.query.address;
 Forcast.getForcast(address,(result)=>{
   if(result.error){
    return res.send({
      error:result.error
    })
   }
   res.send({
    address,
    forcast:result,
 })
});
 })
 

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title: "404",
    message: 'Help article not found',
    name: "Manoj Sawant",
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title: "404",
    message: 'unable to find url.',
    name: "Manoj Sawant",
  })
})
app.listen(port, "localhost", () => {
  console.log("Server is up on port 3000");
});
