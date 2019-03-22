const mongoose = require('mongoose');
const dateTime = require('node-datetime');
//Model
const ScheduledMelt = require('../../model/production/scheduleMelt');
const UnscheduledMelt = require('../../controller/production/unscheduled-melt');
const CompletedMelt = require('../../controller/production/completed-melt');

//getting all info from DB
exports.schedule_melt_get_all = (req, res) => {
    ScheduledMelt.find().limit(4)
        .sort({ 'deliveryDate': '1' })
        .where('status')
        .equals('A')
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
};
exports.schedule_melt_get = (req, res) => {
    ScheduledMelt.find()
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
};

exports.schedule_melt_get_customer = (req, res) => {
    ScheduledMelt.find()
        .where('customerName')
        .equals(req.params.customerName)
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
};


exports.save_scheduled_melt = (req, res) => {
    //Get currrent date and Time
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    console.log('req.body', req.body);
    var i = 1;
    var _id = null;
    req.body.forEach(element => {
        console.log('')
        _id = element._id;
        UnscheduledMelt.unscheduled_melt_find_by_id(_id).then(docs => {        
            const scheduledMelt = new ScheduledMelt({
                _id: new mongoose.Types.ObjectId(),
                orderId: docs.orderId,
                order: docs.order,
                customerName: docs.customerName,
                partId: docs.partId,
                meltWeight: element.totalWeight,
                moldType: docs.moldType,
                coreWeight: docs.coreWeight,
                quantity: element.quantity,
                partWeight: docs.partWeight,
                paintingType: docs.paintingType,
                totalWeight: element.totalWeight,
                deliveryDate: element.deliveryDate,
                orderDate: docs.orderDate,
                status: 'A',
                createdOn: date
            });
            scheduledMelt.save()
                .then(docs1 => {
                    console.log('docs1', docs1);                                                     
                        if (req.body.length == i) {
                            console.log('i',i);
                            CompletedMelt.completed_melt_save(docs, req, res).then(docs2 => {
                            UnscheduledMelt.unscheduled_melt_status_update(_id).then(result => {
                                res.status(200).json({
                                    "message": "success"
                                })
                            })
                        })
                        }
                        console.log('i',i);
                        i++ ;
                    })
                        .catch(err => {
                            res.status(500).json({
                                "message": "errrrrrr"
                            })
                        })
                })
                .catch(err => {
                    res.status(500).json({
                        "message": "errrrrrr"
                    })
                })
            })
            
        }
    


async function find_schedule_id(req, res, id) {
    var schedule;
    await ScheduledMelt.findById(id)
        .exec()
        .then(doc => {
            schedule = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return schedule;
}

async function update_schedule_status_id(req, res, id) {
    await ScheduledMelt.findByIdAndUpdate({ '_id': id }, {
        $set: {
            status: "D"
        }
    },
        { new: true })
        .exec()
        .then(doc => {

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

}
module.exports.find_schedule_id = find_schedule_id;
module.exports.update_schedule_status_id = update_schedule_status_id;