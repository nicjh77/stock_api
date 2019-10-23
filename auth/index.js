const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../db/user');

router.get('/', (req, res) => {
    res.json({
        message: 'security'
    });
});

let validateUser = (user) => {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim().length >= 6;
    return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
    if(validateUser(req.body)) {
        User
          .getOneByEmail(req.body.email)
          .then(user => {
              if(!user){
                bcrypt.hash(req.body.password, 10)
                  .then((hash) => {
                    const user = {
                        email: req.body.email,
                        password: hash
                    }
                    User.create(user).then(id => {
                        res.status(200).json({registered: true, user: id});
                    });
                  });
              }else{
                res.status(400).json({registered: false, message: 'Email in use'});
              }
          });
    }else{
        next(new Error('Invalid User'));
    } 
});

module.exports = router;