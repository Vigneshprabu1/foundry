const uploadFolder =  'D:/Foundry Project/foundry-server/uploads/';
const fs = require('fs');
const path = require('path');


exports.uploadFile = (req, res) => {
	res.status(200).json({
		message:"upload Successfully"
	});
}

exports.listUrlFiles = (req, res) => {
	fs.readdir(uploadFolder, (err, files) => {
		var  Link ="http://localhost:3000/api/file/";
		for (let i = 0; i < files.length; ++i) {
			files[i] = Link + files[i];
		}

		res.send(files);
	
	})
}
 exports.readtxt = (req, res) => {
    fs.readFile('./uploads/about.txt',function(err,buf1){
		fs.readFile('./uploads/news.txt',function(err,buf2){
		 fs.readFile('./uploads/mark.txt',function(err,buf3){
			res.status(200).json({
				about:buf1.toString(),
				news:buf2.toString(),
				markque:buf3.toString()
			})
	 });
	});
	 });
 }

 exports.readnews = (req, res) => {
	fs.readFile('./uploads/news.txt',function(err,buf){
	   res.status(200).json(buf.toString())
	});
}

exports.readmark = (req, res) => {
	fs.readFile('./uploads/mark.txt',function(err,buf){
	   res.status(200).json(buf.toString())
	});
}
exports.downloadFile = (req, res) => {
	let filename = req.params.filename;
	res.download(uploadFolder + filename);
}
exports.deleteFile=(req,res)=>{

const directory = './uploads';

fs.readdir(directory, (err, files) => {
  if (err) throw err;
	
  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
	});
  }
});
}
 