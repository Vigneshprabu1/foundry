const express=require('express');
const router=express.Router();

const userController=require('../controller/user');

router.get('/all',userController.user_get);
router.get('/',userController.user_get_all);
router.post('/',userController.user_save);
router.patch('/:userId',userController.user_update);
router.put('/:userId',userController.user_delete);



module.exports=router;