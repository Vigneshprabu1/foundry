
const express=require('express');
const router=express.Router();
const productController=require('../controller/product')


router.get('/', productController.get_all_product);

router.get('/productName/:productName', productController.get_product_by_productName);
router.get('/partId/:partId', productController.get_product_by_partId);
router.post('/partType/', productController.get_product_by_partType);
router.post('/partSubType/', productController.get_product_by_partSubType);
router.get('/:productId', productController.get_order);

module.exports=router;