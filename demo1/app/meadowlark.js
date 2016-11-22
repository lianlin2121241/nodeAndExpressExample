var express=require("express")
var app=express()

//设置端口
app.set('port',process.env.PORT||3000)

app.get("/",function(req,res){
	res.type("text/plain");
	res.send("Meadowlark Trave");
})

app.get("/about",function(req,res){
	res.type("text/plain");
	res.send("About Meadowlark Trave");
})

//设置404状态
app.use(function(req,res){
	res.type("text/plain");
	res.status(404);
	res.send("404 Not Found");
})

//设置500状态
app.use(function(req,res){
	res.type("text/plain");
	res.status(500);
	res.send("500 Server Error");
})

//启动监听
app.listen(app.get('port'),function(){
	console.log("Express started on http://localhost:"+app.get('port')+";press Ctrl-C to terminate");
})