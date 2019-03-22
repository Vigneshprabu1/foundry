const dateTime = require('node-datetime');
const mongoose=require('mongoose');

/** Model */
const Product=require('../model/product');


/** Get All Product All */
exports.get_all_product = (req, res, next) => {
    Product.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/** Get ProductName  */
exports.get_product_by_productName = (req, res, next) => {
    const productName = req.params.productName;
    Product.find({'productName':productName})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.get_product_by_partType = (req, res, next) => {
    Product.find({'partType':req.body.partType})
    .where('productName')
    .equals(req.body.productName)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.get_product_by_partSubType = (req, res, next) => {
    Product.find({'partSubType':req.body.partSubType})
    .where('productName')
    .equals(req.body.productName)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.get_order = (req, res, next) => {
    Product.findById(req.params.productId)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.get_product_by_partId = (req, res, next) => {
    Product.find({'partId':req.params.partId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

async function production_save(req,res){
    const dt = dateTime.create();
    const formatted = dt.format('d-m-Y H:M:S');
    var products;
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.product.productName,
        partType: req.body.product.partType,
        partSubType: req.body.product.partSubType,
        partId: req.body.product.partId,
        partWeight: req.body.product.partWeight,
        patternImage: req.body.product.patternImage,
        MethodImage: req.body.product.MethodImage,
        moldType: req.body.product.moldType,
        moldWeight: req.body.product.moldWeight,
        costWeight: req.body.product.costWeight,
        coreWeight: req.body.product.coreWeight,
        maxWallThickness: req.body.product.maxWallThickness,
        minWallThickness: req.body.product.minWallThickness,
        noOfCavity: req.body.product.noOfCavity,
        noOfCores: req.body.product.noOfCores,
        coleHoleDiameters: req.body.product.coleHoleDiameters,
        shapecomplexity: req.body.product.shapecomplexity,
        surfaceRoughness: req.body.product.surfaceRoughness,
        tolerance: req.body.product.tolerance,
        maxCostLength: req.body.product.maxCostLength,
        materialGrade: req.body.product.materialGrade,
        runnerWidth: req.body.product.runnerWidth,
        runnerDiameter: req.body.product.runnerDiameter,
        noOfGates: req.body.product.noOfGates,
        raiserHeight: req.body.product.raiserHeight,
        raiserDiameter: req.body.product.raiserDiameter,
        partCost: req.body.product.partCost,
        totalQuantity: req.body.product.totalQuantity,
        totalWeight: req.body.product.totalWeight,
        totalCost: req.body.product.totalCost,
        createdBy: req.body.createdBy,
        createdOn: formatted,
        status: 'A'
    });
    await product.save()
        .then(doc => {
            products=doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
        return products;
}



async function find_cores(partId){
    console.log('partId',partId);
    var result=Product.findOne({'partId':partId})
    .exec()
    return result;
}

module.exports.find_cores=find_cores;
module.exports.production_save=production_save;