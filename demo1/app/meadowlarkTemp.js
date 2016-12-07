var express=require("express")
var app=express()

var fortunes=require("./lib/fortune.js");

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

//创建中间件获取天气数据给res.locals.partials
app.use(function(req,res,next){
	if(!res.locals.partials)res.locals.partials={};
	res.locals.partials.weather=getWeatherData();
	next();
})

//设置端口
app.set('port',process.env.PORT||3000)

app.get("/",function(req,res){
	res.render("home",{name:"Li Mingle"});
})

app.get("/about",function(req,res){
	res.render("about",{fortune:fortunes.getFortune()});
})

app.get("/getTable",function(req,res){
	res.json({"aa":"bb"})
})

app.get("/jqueryTest",function(req,res){
	res.render("jquerytest",{layout:'hasjQuery'})
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

//获取天气数据
function getWeatherData(){
	return {
		locations:[
			{
				name:'Portland',
				forecastUrl:"http://www.wunderground.com/US/OR/Portland.html",
				iconUrl:"http://icons-ak.wxug.com/i/c/k/cloudy.gif",
				weather:"Overcast",
				temp:"54.1 F(12.3 C)"
			},
			{
				name:'Bend',
				forecastUrl:"http://www.wunderground.com/US/OR/Bend.html",
				iconUrl:"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
				weather:"Partly Cloudy",
				temp:"55.1 F(13.3 C)"
			},
			{
				name:'Manzanita',
				forecastUrl:"http://www.wunderground.com/US/OR/Manzanita.html",
				iconUrl:"http://icons-ak.wxug.com/i/c/k/rain.gif",
				weather:"Light Rain",
				temp:"56.1 F(14.3 C)"
			}
		]
	}
}