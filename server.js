/**
 * @Author: Matthew Auld <matthew>
 * @Date:   Sunday, September 17th 2017, 1:28:02 AM
 * @Email:  matthew@jumpbuttonstudio.com
 * @Project: Booking System
 * @Filename: server.js
 * @Last modified by:   matthew
 * @Last modified time: Sunday, September 17th 2017, 3:03:58 AM
 * @Copyright: 2017 JumpButton North
 */

global.log = require("jbs-simple-console-logger");
log.info("Starting server...");

let express = require("express");
let app = express();

let booking = require("./Booking System/booking-system.js")(app);

app.use(express.static("public"));

app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
});
app.listen(1234);
