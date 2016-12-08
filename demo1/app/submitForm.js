var express=require("express")
var app=express()

//加载handlebars引擎
var handlebars=require("express3-handlebars")
	.create({
		partialsDir:"views/partials",
		layoutsDir:"views/layouts",
		defaultLayout:"main",
		extname:'.hbs',
		helpers:{
			//设置段落
			section:function(name,options){
				if(!this._sections)this._sections={};
				this._sections[name]=options.fn(this);
				return null;
			}
		}
	})
//设置默认引擎为handlebars
app.engine("hbs",handlebars.engine)
app.set("view engine","hbs");

//设置public为静态路径
app.use(express.static(__dirname+"/public"));

//引入body-paser中间件
app.use(require('body-parser')());

//创建中间件获取天气数据给res.locals.partials
app.use(function(req,res,next){
	if(!res.locals.partials)res.locals.partials={};
	// res.locals.partials.weather=getWeatherData();
	next();
})

//设置端口
app.set('port',process.env.PORT||3000)

//显示页面接口
app.get("/newsletter",function(req,res){
	res.render("newsletter",{csrf:'CSRF token goes here'});
})

//显示页面接口
app.get("/newsletterJquery",function(req,res){
	res.render("newsletterJquery",{layout:"hasjQuery",csrf:'CSRF token goes here'});
})

//显示感谢页面
app.get("/thank-you",function(req,res){
	res.render("thank-you");
})

//数据请求
app.post("/process",function(req,res){
	console.log('Form (form querystring):'+req.query.form);
	console.log('CSRF TOKEN (form querystring):'+req.body._csrf);
	console.log('Name (form visible form field):'+req.body.name);
	console.log('Email (form visible form field):'+req.body.email);
	// res.send("thankyou")
	res.redirect(303,"/thank-you") //重定向到感谢页面
})

//数据请求
app.post("/processjquery",function(req,res){
	console.log('Form (form querystring):'+req.query.form);
	console.log('CSRF TOKEN (form querystring):'+req.body._csrf);
	console.log('Name (form visible form field):'+req.body.name);
	console.log('Email (form visible form field):'+req.body.email);
	if(req.xhr||req.accepts('json,html')==="json"){
		res.send({success:true});
	}else{
		res.redirect(303,"/thank-you")
	}
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