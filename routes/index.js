var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

//Schemas
var EPoem = mongoose.model('EPoem');
var userPoem = mongoose.model('userPoem');
var User = mongoose.model('User');
var userList = mongoose.model('userList');

//lightweight HTTP request library
var unirest = require('unirest');

var router = express.Router();

//Used to replace line breaks in user input
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

//-------------------------Home Page|Poems-------------------------
router.get('/', function (req, res) {
    res.render('home');
});

router.get('/lionsden', function (req, res) {
    console.log("---------------------------Load Lion's Den Page---------------------------");
    //Find Elizabeth's poems to display

    //If anyone is logged on
    if (!!req.user) {

        //If admin is logged in
        if (req.user.username == "ed1340") {

            EPoem.find(function (err, Poem, count) {
                console.log("---------Find Poem---------");
                //console.log(err, Poem, count);

                if (err) {
                }

                else {
                    res.render('lionsdenadmin', {Poem: Poem});
                }
            });
        }

        //Else display Elizabeth's poetry
        else {
            EPoem.find(function (err, Poem, count) {
                console.log("---------Find Poem---------");
                //console.log(err, Poem, count);

                if (err) {

                }

                else {
                    res.render('lionsden', {Poem: Poem});
                }
            });
        }
    }

    //Else display Elizabeth's poetry
    else {
        EPoem.find(function (err, Poem, count) {
            console.log("---------Find Poem---------");
            //console.log(err, Poem, count);

            if (err) {

            }

            else {
                res.render('lionsden', {Poem: Poem});
            }
        });
    }
});

//--------------------For admin to enter poem--------------------
router.post('/lionsden', function (req, res) {

    var poemInstance;
    var contentRevised = req.body.content.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");

    //Create instance of Poem with user input data
    poemInstance = new EPoem({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        content: contentRevised
    });

    //console.log(poemInstance.content);
    if (poemInstance.title != '' && poemInstance.content != '' && poemInstance.author != '') {

    }

    poemInstance.save(function (err, Poem, count) {
        if (err) {
            console.log(err);
        }

        else {
            console.log("------POEM INSTANCE SAVED------\n", poemInstance);
            res.redirect('/lionsden');
        }
    });
});

module.exports = router;
