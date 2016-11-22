var express=require("express")
var app=express()

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

//设置随机数组
var fortunes=[
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don`t know",
	"You will have a pleasant surprise",
	"Whenever Possible,keep it simple"
]

app.get("/",function(req,res){
	res.render("home");
})

app.get("/about",function(req,res){
	var randomForune=fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render("about",{fortune:randomForune});
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