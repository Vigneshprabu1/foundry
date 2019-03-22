/* import module */
const mongoose= require('mongoose');
const express = require('express');
const router = express();

/* controller */
const RejectionController = require('../../controller/production/rejection');

/* save Rejection details */
router.post('/',RejectionController.save_rejection);

/* get rejection details */
router.get('/',RejectionController.get_rejection);

module.exports = router;