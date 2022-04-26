const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const models = require('../models/');

//les  routes
module.export ={
    register: function(req, res){
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        
        if (email ==null || username == null || password == null){
            return res.status(400).json({'error':'missing parameters'});
        }
        models.User.findOne({
         
            where: { email: email }
          })
          .then(function(userFound) {
              if(!userFound){
                bcrypt.hash(password, 5, function(err,bcryptedPassword) {
                    var newuser = models.user.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        isAdmin: 0
                    })
                    .then(function(newuser) {
                        return res.status(201).json({
                            'userId': newuser.id
                        })
                    })
                        .catch(function(err) {
                            return res.status(500).json({'error':'cannot add user'});
                        });
                    

                });
              }
              else {
                return res.status('409').json({ 'error': 'user already exist' });
 
              }
            // done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });

          
        });
    },
    login: function(req, res) {
       var email = req.body.email;
       var password = req.body.password;
       
       if (email == null || password == null) {
        return res.status(400).json({'error':'missing parameters'});
        
        }

        models.User.findOne({
            where: { email: email }
          })
          .then(function(userFound) {
            if(userFound){
                bcrypt.compare(password,userFound.password,function(errBycrypt,resBycrypt){
                    if(resBycrypt) {
                        return res.status(200).json({
                            'userId':userFound,
                            'token':jwtUtils.generateTokenForUser(userFound)
                        });
                    }else {
                        return res.status(403).json({'error':'invalid password'});

                    }
                });

            }
            else {
                return res.status(404).json({ 'error':'user not exist in BD'});
            }
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
    }
}