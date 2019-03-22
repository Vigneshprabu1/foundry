const express=require('express');
const router= express.Router();
const orderController=require('../controller/order')


router.get('/', orderController.get_all_order);

router.post('/', orderController.order_save);

router.get('/:orderId', orderController.get_order);

module.exports=router;