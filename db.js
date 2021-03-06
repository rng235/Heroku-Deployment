var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var URLSlugs = require('mongoose-url-slugs');


//Poetry that will be displayed
var EPoem = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true},
    date:{type: Date, required: false}
});

//Poetry that will be displayed
var userPoem = new mongoose.Schema({
    //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: {type: String, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true},
    date:{type: Date, required: false}
});

var userList = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    listName: {type: String, required: true},
    userPoems: [userPoem]
});

var User = new mongoose.Schema({
    list: [userList]
});

//For authentication
User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('userList', userList);
mongoose.model('EPoem', EPoem);
mongoose.model('userPoem', userPoem);


//For Local Testing
//mongoose.connect('mongodb://localhost/final');

//For heroku deployment
const uristring = 'mongodb+srv://rng235:!Firecold6031241@cluster-x91l02fz.mxpam.mongodb.net/heroku_x91l02fz?retryWrites=true&w=majority'

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
