/**
 * @Author: Matthew Auld <matthew>
 * @Date:   Sunday, September 17th 2017, 1:36:00 AM
 * @Email:  matthew@jumpbuttonstudio.com
 * @Project: Booking System
 * @Filename: booking-system.js
 * @Last modified by:   matthew
 * @Last modified time: Sunday, September 17th 2017, 2:20:09 AM
 * @Copyright: 2017 JumpButton North
 */

'use strict';

let logger = require("jbs-simple-console-logger");
let pjson = require("./package.json");
let version = pjson.version;

function BookingSystem(){
	
}
log.info("Booking System Loading...");


module.exports = function(app){
	app.get("/booking/jbnbook.js",function(req,res){
		res.sendFile(__dirname + "/booking-system-client.js");
	});
};
