/* import module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* Controller */
const progressBarController = require('../../controller/production/progress-bar');

/* getting all data */
router.get('/:meltId',progressBarController.get_percentage);

module.exports = router;
