var express = require('express');      //Similar to import in ES 2015
var bodyParser = require('body-parser');
var path = require('path');
var validator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customer', ['users']); // db object is used to refer the database , customer is app name and users is the database name
var ObjectId = mongojs.ObjectId;
var app =express();   //Initialization and we use app object all the time
/*var logger = (req, res , next) =>{            //Simple Middleware which will respond logging each time a new request comes up
	console.log('logging.....');
	next();
}
app.use(logger);*/  


app.set('view engine','ejs'); //ejs is the framework to write the pages in view folder
app.set('views',path.join(__dirname, 'views'));

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());

app.use(express.static(path.join(__dirname, 'public')));   //__dirname is for global object so dat we can write script some other place and 'public' is the folder which holds the static pages

//Middleware to declare new Global variable 
app.use( (req,res,next) =>{
  res.locals.errors = null;
  //res.locals.newUser {};
  next();
});
var person = {
	name: 'Jeff',
	age: 3
}
app.get('/',(req,res) => {
	db.users.find(function (err, docs) {
	res.render('index',{
		title: 'Customers',
		users: docs

	});
	})

});
app.post('/users/add', (req,res) =>{
    req.checkBody("first_name","First Name is Required").notEmpty();
    req.checkBody("last_name","Last Name is Required").notEmpty();
    req.checkBody("email","Email is not valid").isEmail();
   
    var errors = req.validationErrors();
    if(errors)
    {
      res.render('index',{
      	title: 'Customers',
      	users: docs,
      	errors: errors
      });
    }
    else
    {
	   var newUser={
		firstname: req.body.first_name,   //we r sending the data using the post http func, dats y using 
		lastname: req.body.last_name,     //req object and then putting into and object with the help of 
		email: req.body.email             //body object and data stored in it
	   } 
	   db.users.insert(newUser, function(error,result){
	   	     if(error)
	   	     {
	   	     	console.log(error);
	   	     }
	   	     res.redirect('/');
	   });
	}  
	
});

//Delete Middleware
app.delete('/users/delete/:id',function(req,res){
  db.users.remove({_id: ObjectId(req.params.id)}, function(err,result){
    if(err)
    	console.log(err);
    res.redirect('/');
  });

});
app.listen(3100, () => {

	console.log('Server Started');
})

