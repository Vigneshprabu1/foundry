/* import module */
const mongoose= require('mongoose');
const express= require('express');
const router = express();

/* controller */
const ReturnAndRejectionController = require('../../controller/production/return-and-rejection');

/* getting return and rejection details */
router.get('/',ReturnAndRejectionController.get_return_and_rejection);

module.exports = router;