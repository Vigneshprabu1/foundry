/* module  */
const express = require('express');
const mongoose = require('mongoose');
const router = express();

/* controller  */
const Melting = require('../../model/production/melting');
const meltingController = require('../../controller/production/melting');

/* getting  document by meltNo  */
router.get('/:meltNo', meltingController.get_melting);  

/* save method  */
router.post('/', meltingController.melting_save);


/* update method  */
router.patch('/:_id', meltingController.update_melting);



module.exports = router;