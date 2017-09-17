/**
 * @Author: Matthew Auld <matthew>
 * @Date:   Sunday, September 17th 2017, 2:11:01 AM
 * @Email:  matthew@jumpbuttonstudio.com
 * @Project: Booking System
 * @Filename: booking-system-client.js
 * @Last modified by:   matthew
 * @Last modified time: Sunday, September 17th 2017, 4:08:04 AM
 * @Copyright: 2017 JumpButton North
 */

// Default Options
let booking_system = null;
// Check if JQuery is Installed.
if(!window.jQuery){
	throw Error("The JumpButton North Booking System Requires jQuery To Be Installed.");
}else{
	// CO = Custom Options.
	function JBNBookingSystem(co){
		if(booking_system === null){
			// BO = Booking Options
			let bo = {
			 	name: "Booking System",
				container: "#jbn_booking"
			};
			if(co){
				bo.name = co.hasOwnProperty("name") ? co.name : bo.name;
			}
			booking_system = undefined;
			$(document).ready(function(){
				booking_system = new BookingSystem(bo);
			});
		}
	}
}

function BookingSystem(options){
	console.log("Preparing Booking System.");
	if(!this.checkForBootstrap() === true){
		throw Error("Please Ensure You're Using Bootstrap V4.0 For The Best Experience.");
	}

	this.name = options.name;
	this.container = options.container;

	this.generateCSS = function(){
		console.log("Generating Dynamic CSS");
		let css = "<style type=\"text/css\" id=\"calendar_styles\"></style>";
		if($(this.container + " > style").length === 0){
			$(this.container).append(css);
			this.generateCSS();
		}else{
			css = "#jbn_booking_system .month-name > h1{ font-size:16px; }";
			$(this.container + " > style").html(css);
		}
		return css;
	};

	if($(this.container).length === 0){
		throw Error("The Booking System Container Is Not On This Page.");
	}else{
		this.render();
	}


};

BookingSystem.prototype.checkForBootstrap = function(){
	let hasBootstrap = false;
	$('link').each(function(){
		if(this.href.indexOf("4.0") >= 0 && this.href.indexOf("bootstrap.min.css") >= 0){
			hasBootstrap = true;
		}
	});
	return hasBootstrap;
};

BookingSystem.prototype.render = function(){
	if($(this.container + " > div#jbn_booking_system").length === 0){
		let html = "<div id=\"jbn_booking_system\">";
		html += "<div class=\"row\">";
		html += "<div class=\"col-md-12 text-center month-name\">";
		html += "<h1><i class=\"fa fa-spin fa-spinner\"></i> Loading Calendar...</h1>";
		html += "</div>";
		html += "</div>";
		html += "<div class=\"row\">";
		html += "<div class=\"col-md-6\">";
		html += "<div class=\"btn-group\" role=\"group\">";
		html += "<button type=\"button\" class=\"btn btn-sm\">Day</button>";
		html += "<button type=\"button\" class=\"btn btn-sm\">Week</button>";
		html += "<button type=\"button\" class=\"btn btn-sm active\">Month</button>";
		html += "</div>";
		html += "</div>";
		html += "<div class=\"col-md-6 text-right\">";
		html += "<div class=\"btn-group mr-3\" role=\"group\">";
		html += "<button type=\"button\" class=\"btn btn-sm\"><i class=\"fa fa-chevron-left\"></i></button>";
		html += "<button type=\"button\" class=\"btn btn-sm\"><i class=\"fa fa-chevron-right\"></i></button>";
		html += "</div>";
		html += "<button type=\"button\" class=\"btn btn-sm\">Today</button>";
		html += "</div>";
		html += "</div>";
		html += "<div class=\"row\">";
		html += "<div class=\"col-1 text-center\">Sunday</div>";
		html += "<div class=\"col-2 text-center\">Monday</div>";
		html += "<div class=\"col-2 text-center\">Tuesday</div>";
		html += "<div class=\"col-2 text-center\">Wednesday</div>";
		html += "<div class=\"col-2 text-center\">Thursday</div>";
		html += "<div class=\"col-2 text-center\">Friday</div>";
		html += "<div class=\"col-1 text-center\">Saturday</div>";
		html += "</div>";
		html += "</div>";
		$(this.container).html(html);
		this.generateCSS();
		this.render();
	}else{

	}
};
