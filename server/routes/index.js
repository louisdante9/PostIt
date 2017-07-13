
import { Users, Groups, Messages } from '../controller';
import Authenticate from '../middleware/auth';

module.exports = (app, isAuth) => {
     app.get('/contact', (req, res)=>{
            res.render('contact.html')
    })

    //Signp route
     app.get ('/api/users/signup', (req, res)=>{
        res.render('signup')
    })
    app.post('/api/user/signup',Users.signup);
   
    //Login routes
    app.get ('/api/users/signin', (req, res)=>{
        res.render('signin')
    })
    app.post('/api/user/signin',Users.login);

    
    app.get('/api/creategroup',(req, res)=>{
        res.render('creategroup.html')
    });
     app.get('/api/messageboard',(req, res)=>{
        res.render('messageboard.html')
    });
    
    app.get('/api/group/:groupId/messages', Authenticate.verifyToken, Messages.getGroupMessage);
    app.post('/api/group/:groupId/messages', Authenticate.verifyToken, Messages.createNewMessage);
    //Routes Creates a group
    app.post('/api/group', Authenticate.verifyToken, Groups.create);

    //Routes List All Groups 
    app.get('/api/group', Authenticate.verifyToken, Groups.list);

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


