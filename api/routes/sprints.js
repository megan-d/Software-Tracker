const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');
const Project = require('../models/Project');
const Sprint = require('../models/Sprint');

//*****SPRINT ROUTES */

//ROUTE: GET api/projects/sprints/me
//DESCRIPTION: Get all sprints for current user
//ACCESS LEVEL: Private
router.get('/me', verify, async (req, res) => {
    res.send('sprints route');
  });

module.exports = router;