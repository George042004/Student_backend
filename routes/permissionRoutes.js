const express = require('express');
const router = require('express').Router();
const permissionControllers = require('../controllers/permissionControllers')
const auth = require('../middleware/auth')

router.post('/',auth,permissionControllers.permission)
router.get('/getRequests',permissionControllers.getRequests)
router.put('/updateReq',permissionControllers.reqStatusUpdate)
router.get('/myreq',auth,permissionControllers.myReq)

module.exports = router