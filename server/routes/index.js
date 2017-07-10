 
//  const groupsController = require('../controller').groups;
//  const usersController = require('../controller').users
import { Users, Groups } from '../controller';

 const isLoggedIn = (req, res, next)=> {
    // if user is authenticated in the session, carry on 
    // if (req.isAuthenticated())
    //     return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
 }

module.exports = (app)=>{
     app.get('/contact', (req, res)=>{
            res.render('contact.html')
    })
    app.post('/api/user/signup',Users.signup);
    app.post('/api/user/signin',Users.login);
    app.get('/api/group/:groupId',Groups.list);
     app.get('/api/creategroup',(req, res)=>{
        res.render('creategroup.html')
    });
     app.get('/api/messageboard',(req, res)=>{
        res.render('messageboard.html')
    });
    app.post('/api/group', Groups.create);
    //app.get('/api/group', Groups.list);

    app.get('/api/user/signin', (req, res)=>{
            res.render('signin.html')
    })

    //process the login form
    //app.post('/api/user/signin', //take you to message board
    //);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/api/user/signup', (req, res)=> {
        res.render('signup.html',{
            title: "sign up",
            page: "signup",
            //message: req.flash('signupMessage')
        });
    });
    // process the signup form
    // app.post('/api/user/signup', 

    // );

        // =====================================
        // PROFILE SECTION =====================
        // =====================================
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
   
    
    // app.post('/api/group',isLoggedIn, function(req, res) {
    //     res.render('creategroup.html',{
    //         title: "profile",
    //         user : req.user // get the user out of session and pass to template
    //     });
    // });
    app.get('/api/group/<group id>/user',isLoggedIn, function(req, res) {
        res.render('profile',{
            title: "profile",
            user : req.user // get the user out of session and pass to template
        });
    });
//   app.post('/api/group/<group id>/user',isLoggedIn, function(req, res) {
//         res.render('profile',{
//             title: "profile",
//             user : req.user // get the user out of session and pass to template
//         });
//     });

    //logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};


