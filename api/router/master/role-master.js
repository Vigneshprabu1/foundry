/*  Importing Mongoose Module */
const mongoose = require('mongoose');
const express= require('express');
const router= express();

/* Controller */
const RoleMasterController = require('../../controller/master/role-master');

/* Get All Role Master Details */
router.get('/',RoleMasterController.get_role_master);

/*Save Role Master */
router.post('/',RoleMasterController.save_role_master);

/* Update Role Master */
router.put('/',RoleMasterController.update_role_master);

/*Delete Role Master */
router.patch('/',RoleMasterController.delete_role_master);


module.exports = router;