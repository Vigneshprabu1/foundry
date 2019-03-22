const http= require('http');
const autoIncrement=require('mongoose-auto-increment');
const app= require('./index.js');
const {mongoose}=require('./database.js');
const jsreport = require('jsreport')()

const port = process.env.PORT || 3000;
const server= http.createServer(app);
server.listen(port);


// if (process.env.JSREPORT_CLI) {
//   // export jsreport instance to make it possible to use jsreport-cli
//   module.exports = jsreport
// } else {
//   jsreport.init().then(() => {
//     // running
//   }).catch((e) => {
//     // error during startup
//     console.error(e.stack)
//     process.exit(1)
//   })
// }
