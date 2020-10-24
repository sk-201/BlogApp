const bodyParser= require("body-parser"),
    mongoose=   require("mongoose"),
    express=    require("express"),
    app=        express(),
    dotenv=     require("dotenv");
dotenv.config();    
const port = process.env.PORT || 5000 ;
const url = process.env.MONGODB_URL;
    //APP config
    mongoose.connect(url,{urlencoded: true , useUnifiedTopology:true })
.then(() => console.log("MongoDB connected"))
.catch((err) => {console.log(err)});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
//Mongoose Config
var  blogschema= mongoose.Schema(
    { name: String,
      image: String,
      body: String,
      created: {type:Date, default: Date.now}  

});
 const Blog= mongoose.model("Blog",blogschema );

 

//RestRouting
    //Index route
   app.get("/blogs", (req,res) => {
   Blog.find({},(err,blog) => {
    if(err){
        console.log("ERROR!");
    }else{
        res.render("index",{blog:blog});
    }


   })
    
   });
  //New Route
  app.get("/blogs/new", (req,res) => {
    res.render("new");



  }) ; 
 //Create route
 app.post("/blogs" , (req,res) => {
    var name=req.body.name;
    var image=req.body.image;
    var body=req.body.body;
    var newBlog={name: name, image: image, body:body};
    
    Blog.create(newBlog, (err,blog) => {
        if(err){
            res.redirect("/blogs/new")
        }else{
            res.redirect("/blogs")
        }

    });



 })   
        
 app.listen(port,() => {
        console.log("Server started");
    }); 