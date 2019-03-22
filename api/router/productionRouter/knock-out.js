/* module */
const mongoose = require('mongoose');
const express = require('express');
const router = express();

/* controller */
const knockoutController = require('../../controller/production/knock-out');

/* save the knock out details */
router.post('/', knockoutController.knockout_save);


/* finding the which partId knockout is completed*/
router.get('/checkKnockOut/:meltNo', knockoutController.knockout_check); 

/* update the data with ObjectId */
router.patch('/:_id', knockoutController.knockout_update_with_ObjectId);

/*getting the data with batchID */
router.get('/:batchId', knockoutController.knockout_get);


module.exports = router;