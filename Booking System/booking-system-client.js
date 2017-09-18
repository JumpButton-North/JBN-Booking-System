/**
 * @Author: Matthew Auld <matthew>
 * @Date:   Sunday, September 17th 2017, 2:11:01 AM
 * @Email:  matthew@jumpbuttonstudio.com
 * @Project: Booking System
 * @Filename: booking-system-client.js
 * @Last modified by:   matthew
 * @Last modified time: Sunday, September 17th 2017, 8:24:52 PM
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
				container: "#jbn_booking",
				primary_color: "#664898",
			};
			if(co){
				bo.name = co.hasOwnProperty("name") ? co.name : bo.name;
				bo.primary_color = co.hasOwnProperty("primary_color") ? co.primary_color : bo.primary_color;
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
	this.bg_color = options.primary_color;

	this.getPrimaryForeground = function(c){
		var c = c.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		if(luma < 90)
		    return "#FFFFFF";
		return "#000000";
	};


	this.generateCSS = function(){
		let css = "<style type=\"text/css\" id=\"calendar_styles\"></style>";
		if($(this.container + " > style").length === 0){
			$(this.container).append("<link rel=\"stylesheet\" type=\"text/css\" href=\"/booking/jbnstyle.css\">");
			$(this.container).append(css);
			this.generateCSS();
		}else{
			css  = "#jbn_booking_system .week-names .col-md-1{";
			css += "	background-color:" + this.bg_color + ";";
			css += "	color:" + this.getPrimaryForeground(this.bg_color); + ";";
			css += "}";
			css += "#jbn_booking_system .calendar_navigation .btn{";
			css += "	background-color:" + this.bg_color + ";";
			css += "	color:" + this.getPrimaryForeground(this.bg_color) + ";";
			css += "}";
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
		$(this.container).html("");
		this.generateCSS();
		let html = "<div id=\"jbn_booking_system\">";
		html += "<div class=\"row\">";
		html += "<div class=\"col-md-12 text-center month-name\">";
		html += "<h1><i class=\"fa fa-spin fa-spinner\"></i> Loading Calendar...</h1>";
		html += "</div>";
		html += "</div>";
		html += "<div class=\"row calendar_navigation\">";
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
		html += "<div class=\"row seven-cols week-names\">";
		html += "<div class=\"col-md-1 text-center\">Sunday</div>";
		html += "<div class=\"col-md-1 text-center\">Monday</div>";
		html += "<div class=\"col-md-1 text-center\">Tuesday</div>";
		html += "<div class=\"col-md-1 text-center\">Wednesday</div>";
		html += "<div class=\"col-md-1 text-center\">Thursday</div>";
		html += "<div class=\"col-md-1 text-center\">Friday</div>";
		html += "<div class=\"col-md-1 text-center\">Saturday</div>";
		html += "</div>";
		html += "</div>";
		$(this.container).append(html);
		this.render();
	}else{

		console.log("Booking System Ready.");
	}
};
