/*
* module name: production
* sub-module name: melt
*/

/* import module */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/** Model */
const Melt = require('../../model/production/melt');
const RawMaterial = require('../../model/production/raw-material');

/** controller */
const MeltController = require('./melt-report');


/** Get recently completed Melts */
exports.get_recently_completed_melts = (req, res) => {
    console.log('getRecentlyCompletedMelts');
    Melt.find().limit(5)
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}


/** Get ongoing melt details  */
exports.get_current_meltStatus = (req, res) => {
    Melt.findOne({ 'meltStatus': 'ON' })
        .exec()
        .then(result => {
            console.log('result', result)
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

/** Get ongoing melt details  */
exports.get_all_melt = (req, res) => {
    Melt.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};


/** Get ongoing batch status  */
exports.get_current_batchStatus = (req, res) => {
    Melt.findOne({ 'batchStatus': 'ON' })
        .where('meltStatus')
        .equals('C')
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

/** update ongoing melt details */
exports.update_current_melt = (req, res) => {
    console.log('in rawmaterial', req.body);
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    RawMaterial.find({ 'meltNo': req.body.meltNo })
        .exec()
        .then(doc => {
            if (doc.length >= 1) {
                meltUpdate(req, res)
                    .then(doc => {
                        MeltController.update_melt_reports(req, res);
                        res.status(200).json(doc);
                    })
            } else {
                meltUpdate(req, res)
                    .then(doc => {
                        MeltController.update_melt_reports(req, res);
                        res.redirect('/api/rawMaterials/save/ ' + req.body.meltNo + '/' + req.body.moldingType + '/' + req.body.totalMeltWeight+'/'+req.body._id);
                    })
            }
        });
}

/** update melt status to complete  */
exports.status_update = (req, res) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const meltNo = req.params.meltNo;
    Melt.update({ meltNo: meltNo }, {
        $set: {
            meltStatus: 'C',
            modifiedOn: date,
        }
    })
        .exec()
        .then(docs => {
            res.redirect('/api/tempCompScheduleMelts/deleteTempSchMelt');
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

async function batch_status_updation(meltNo) {
    /* Get Current Date And Time*/
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var melt;
    var result = await Melt.update({ meltNo: meltNo }, {
        $set: {
            batchStatus: 'C',
            modifiedOn: date,
        }
    })
        .exec()
        .then(docs => {
            melt = docs;
            return melt;
        })
    return result;
}


async function save_melt(req, res, date, s) {
    console.log('Save Melt');
    function addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }
    var endDate = addDays(new Date(), 7);
    var jsonEndDate = JSON.stringify(endDate);
    var melts;
    const melt = new Melt({
        _id: new mongoose.Types.ObjectId(),
        meltStartDate: new Date().toJSON(),
        meltEndDate: JSON.parse(jsonEndDate),
        meltStatus: 'ON',
        batchStatus: 'ON',
        heatCode: date.substring(8, 10) + s + date.substring(0, 4),
        createdOn: date
    });
    var s1 = await melt.save()
        .then(result1 => {
            melts = result1;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
    return melts;
}

/* update melt function */
async function meltUpdate(req, res) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var update = await Melt.findByIdAndUpdate({ '_id': req.body._id }, {
        $set: {
            totalMeltWeight: req.body.totalMeltWeight,
            meltStartDate: req.body.meltStartDate,
            meltEndDate: req.body.meltEndDate,
            moldingType: req.body.moldingType,
            modifiedOn: date
        }
    })
        .exec();
    return update;
}

/* finding the melt details using meltno */
async function find_melt(meltNo) {
    console.log('update method', meltNo);
    var melt;
    const ss = await Melt.findOne({ 'meltNo': meltNo })
        .exec()
        .then(doc => {
            console.log('docs',doc);
            melt = doc;

        })
    return melt;
}

/* Due to updation of rawmaterial meltweight will be updated in melt function  */
async function meltUpdateRawmaterial(id, weight, meltStartDate, meltEndDate, moldingType) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var update = await Melt.findByIdAndUpdate({ '_id': id }, {
        $set: {
            totalMeltWeight:weight,
            meltStartDate: meltStartDate,
            meltEndDate:meltEndDate,
            moldingType:moldingType,
            modifiedOn: date
        }
    })
        .exec()
    return update;
}
  


module.exports.save_melt = save_melt;
module.exports.find_melt = find_melt;
module.exports.meltUpdate = meltUpdate;
module.exports.batch_status_updation = batch_status_updation;
module.exports.meltUpdateRawmaterial=meltUpdateRawmaterial;