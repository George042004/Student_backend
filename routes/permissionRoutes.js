const express = require('express');
const router = require('express').Router();
const permissionControllers = require('../controllers/permissionControllers')

router.post('/',auth,permissionControllers.permission)
router.get('/getRequests',permissionControllers.getRequests)

module.exports = router