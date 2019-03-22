
const express=require('express');
const router=express.Router();
const customerContoller=require('../controller/customer')



router.get('/', customerContoller.customer_get_all);

router.post('/', customerContoller.save_customer );

router.post('/import', customerContoller.customer_import_database);

router.get('/:customerId', customerContoller.customer_get_one );

router.patch('/:customerId', customerContoller.customer_update );

router.put('/:customerId', customerContoller.customer_delete);

module.exports=router;