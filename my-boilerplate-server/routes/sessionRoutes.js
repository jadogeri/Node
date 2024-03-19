const express = require('express')

const router = express.Router();

const {createSession, getSession, deleteSession, updateSession} = require('../controller/sessionController')

router.route('/:id').get(getSession);

router.route('/:id').put(updateSession);
    
router.route('/').post(createSession);

router.route('/:id').delete(deleteSession);       
            

router.route('/myname/').get(function(req, res){
    res.status(200).json({name:'name is jay dawg'})
    });

module.exports = router;