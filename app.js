var express = require('express');      //Similar to import in ES 2015
var bodyParser = require('body-parser');
var path = require('path');

var app =express();   //Initialization
/*var logger = (req, res , next) =>{            //Simple Middleware which will respond logging each time a new request comes up
	console.log('logging.....');
	next();
}
app.use(logger);*/
//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static(path.join(__dirname, 'public')));   //__dirname is for global object so dat we can write script some other place and 'public' is the folder which holds the static pages

var person = {
	name: 'Jeff',
	age: 30
}
app.get('/',(req,res) => {
	res.json(person);

})

app.listen(3100, () => {

	console.log('Server Started');
})

