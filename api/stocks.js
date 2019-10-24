const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const queries = require('../db/stock_queries');

let isValidId = (req, res, next) => {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid Data'));
}

let validStock = (stock) => {
    const hasVin = typeof stock.vin == 'string' && stock.vin.trim() != '';
    return hasVin;
}

let verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.status(403).json({success: false, message: 'no authorization'});
    }
}

router.get('/', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authData) => {
        if(err){
            res.status(403).json({success: false, message: 'no authorization'});
        }else{
            queries.getAll().then(result => {
                res.status(200).json({success: true, stocks: result, authData});
            });
        }
    });
});

router.get('/:id', isValidId, verifyToken, (req, res, next) => {
    queries.getOne(req.params.id).then(result => {
        if(result)
            res.status(200).json({success:true, stock: result});
        else
            res.status(404).json({success: false, stock: 'Not Found'});
    });
});

router.post('/', verifyToken, (req, res, next) => {
    if(validStock(req.body)){
        queries.create(req.body).then(result => {
            res.status(200).json(({created: true, stock: result[0]}));
        })
    }else{
        next(new Error('Invalid Stock'));
    }
})

router.put('/:id', isValidId, verifyToken, (req, res, next) => {
    if(validStock(req.body)){
        queries.update(req.params.id, req.body).then(result => {
            if(result.length>0)
                res.status(200).json({updated: true, stock: result[0]});
            else
                res.status(404).json({updated: false, stock: 'Not Found'});
        });
    }else{
        next(new Error('Invalid Stock'));
    }
});

router.delete('/:id', isValidId, verifyToken, (req, res, next) => {
    if(validStock(req.body)){
        queries.delete(req.params.id).then(() => {
            res.status(200).json({deleted: true});
        });
    }else{
        next(new Error('Invalid Stock'));
    }
});

module.exports = router;