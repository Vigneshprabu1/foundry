
const uploadFolder =  'D:/Foundry Project/foundry-server/uploads/';
const fs = require('fs');
const path = require('path');
const Product = require('../model/product');
exports.uploadFile = (req, res) => { 
	const id = req.params.id
	const patternImage = req.files[0].filename;
	const MethodImage = req.files[1].filename;
	Product.findByIdAndUpdate({ _id: id }, {
		$set: {
			patternImage: patternImage,
			MethodImage: MethodImage,
		}
	})
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

exports.downloadFile = (req, res) => {
	let filename = req.params.filename;
	console.log(filename);
	res.download(uploadFolder + filename);  
}



