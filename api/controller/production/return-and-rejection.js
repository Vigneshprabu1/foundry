/*
* module name: production
* sub-module name: return
*/

/* import  module */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model */
const ReturnAndRejection = require('../../model/production/return-and-rejection');

/* get Return and Rejection */
exports.get_return_and_rejection = (req, res) => {
    ReturnAndRejection.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            error: err
        })
}

/*  return finding item name function */
async function get_return(itemName) {
    var returns = await ReturnAndRejection.findOne({ 'itemName': itemName })
        .exec()
    return returns;
}

/*  return update function */
async function return_update(itemName, weight) {
    var returns = await ReturnAndRejection.findOneAndUpdate({ 'itemName': itemName }
        , {
            $set: {
                weight: weight
            }
        },
        { new: true })
        .exec();
    return returns;
}

/*  return save function */
async function return_save(req, res, returnWeight, fettlingResult) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var existingWeight;
    var itemName = 'Return';
    var getReturnCheck = get_return(itemName)
        .then(docs => {
            if (docs == null) {
                const returnAndRejection =  new ReturnAndRejection({
                    _id: new mongoose.Types.ObjectId(),
                    itemName: 'Return',
                    weight: returnWeight,
                    createdOn: date,

                });
                returnAndRejection.save()
                    .then((result) => {
                        console.log(result);


                    })
                    .catch(err=>{
                        res.status(500).json(err);
                    });


            } else {
                existingWeight = docs.weight;
                var updationWeight = (Number(existingWeight) + Number(returnWeight)).toFixed(2);

                var updateData = return_update(itemName, updationWeight)
                    .then(doc => {
                        console.log(doc);
                    });

            }

        });

}

module.exports.return_save = return_save;
module.exports.return_update = return_update;
module.exports.get_return = get_return;