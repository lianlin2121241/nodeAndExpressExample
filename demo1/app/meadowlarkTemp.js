var express=require("express")
var app=express()

var fortunes=require("./lib/fortune.js");

//加载handlebars引擎
var handlebars=require("express3-handlebars")
	.create({defaultLayout:"main"})
//设置默认引擎为handlebars
app.engine("handlebars",handlebars.engine)
app.set("view engine","handlebars");

//设置public为静态路径
app.use(express.static(__dirname+"/public"));

//设置端口
app.set('port',process.env.PORT||3000)

app.get("/",function(req,res){
	res.render("home");
})

app.get("/about",function(req,res){
	res.render("about",{fortune:fortunes.getFortune()});
})

//设置404状态
app.use(function(req,res){
	res.status(404);
	res.render("404");
})

//设置500状态
app.use(function(req,res){
	res.status(500);
	res.render("500");
})

//启动监听
app.listen(app.get('port'),function(){
	console.log("Express started on http://localhost:"+app.get('port')+";press Ctrl-C to terminate");
})