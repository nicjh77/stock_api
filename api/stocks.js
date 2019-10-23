const express = require('express');
const router = express.Router();

const queries = require('../db/stock_queries');

let isValidId = (req, res, next) => {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid Data'));
}

let validStock = (stock) => {
    const hasVin = typeof stock.vin == 'string' && stock.vin.trim() != '';
    return hasVin;
}

router.get('/', (req, res) => {
    queries.getAll().then(result => {
        res.status(200).json({success: true, stocks: result});
    });
});

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOne(req.params.id).then(result => {
        if(result)
            res.status(200).json({success:true, stock: result});
        else
            res.status(404).json({success: false, stock: 'Not Found'});
    });
});

router.post('/', (req, res, next) => {
    if(validStock(req.body)){
        queries.create(req.body).then(result => {
            res.status(200).json(({created: true, stock: result[0]}));
        })
    }else{
        next(new Error('Invalid Stock'));
    }
})

router.put('/:id', isValidId, (req, res, next) => {
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

router.delete('/:id', isValidId, (req, res, next) => {
    if(validStock(req.body)){
        queries.delete(req.params.id).then(() => {
            res.status(200).json({deleted: true});
        });
    }else{
        next(new Error('Invalid Stock'));
    }
});

module.exports = router;