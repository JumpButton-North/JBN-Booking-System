/**
 * @Author: Matthew Auld <matthew>
 * @Date:   Sunday, September 17th 2017, 2:11:01 AM
 * @Email:  matthew@jumpbuttonstudio.com
 * @Project: Booking System
 * @Filename: booking-system-client.js
 * @Last modified by:   matthew
 * @Last modified time: Monday, September 18th 2017, 1:20:59 PM
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
				start_date: new Date(),
				full_month_name: true,
			};
			if(co){
				bo.name = co.hasOwnProperty("name") ? co.name : bo.name;
				bo.primary_color = co.hasOwnProperty("primary_color") ? co.primary_color : bo.primary_color;
				bo.full_month_name = co.hasOwnProperty("full_month_name") ? co.full_month_name : bo.full_month_name;
			}

			booking_system = undefined;
			$(document).ready(function(){
				booking_system = new BookingSystem(bo);
			});
		}
	}
}

function BookingSystem(options){
	let self = this;
	this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	this.short_months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	console.log("Preparing Booking System.");
	if(!this.checkForBootstrap() === true){
		throw Error("Please Ensure You're Using Bootstrap V4.0 For The Best Experience.");
	}
	this.today = new Date().getDate();
	this.name = options.name;
	this.container = options.container;
	this.bg_color = options.primary_color;
	this.start_date = options.start_date;
	this.showFullMonths = options.full_month_name;

	$(window).resize(function(){
		self.generateCSS();
	});

	this.getPrimaryForeground = function(c){
		var c = c.substring(1);
		var rgb = parseInt(c, 16);
		var r = (rgb >> 16) & 0xff;
		var g = (rgb >>  8) & 0xff;
		var b = (rgb >>  0) & 0xff;
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		if(luma < 90)
		    return "#FFFFFF";
		return "#000000";
	};


	this.generateCSS = function(){
		if($(this.container + " > style").length === 0){
			$(this.container).append("<link rel=\"stylesheet\" type=\"text/css\" href=\"/booking/jbnstyle.css\">");
			$(this.container).append("<style type=\"text/css\" id=\"calendar_styles\"></style>");
			this.generateCSS();
		}else{
			let css = "";
			css += "#jbn_booking_system .week-names .col-md-1{";
			css += "	background-color:" + this.bg_color + ";";
			css += "	color:" + this.getPrimaryForeground(this.bg_color); + ";";
			css += "}";
			css += "#jbn_booking_system .calendar_navigation .btn{";
			css += "	background-color:transparent;";
			css += "	color:" + this.bg_color + ";";
			css += "	border:1px " + this.bg_color + " solid;"
			css += "}";
			css += "#jbn_booking_system .calendar_navigation .btn.active{";
			css += "	background-color:" + this.bg_color + ";";
			css += "	color:" + this.getPrimaryForeground(this.bg_color) + ";";
			css += "}";
			css += "#jbn_booking_system .week .day.today{";
			css += "	background-color:" + this.getAlphaedColor(this.bg_color,0.75) + ";";
			css += "}";
			css += "#jbn_booking_system .week .day.other-month{";
			css += "	background-color:" + this.getAlphaedColor(this.bg_color,0.25) + ";";
			css += "}";

			if($(this.container).width() < 825){
				css += "#jbn_booking_system .short{";
				css += "	display:none;";
				css += "}";
			}

			if($(this.container).width() < 425){
				css += "#jbn_booking_system .shorter{";
				css += "	display:none;";
				css += "}";
			}

			$(this.container + " > style").html(css);
		}
	};
	if($(this.container).length === 0){
		throw Error("The Booking System Container Is Not On This Page.");
	}else{
		this.render();
	}
};

BookingSystem.prototype.getAlphaedColor = function(color,opacity){
	if(color.indexOf("#") === 0){
		color = color.substring(1);
	}
	let colors = color.match(/.{1,2}/g);
	let r = parseInt(colors[0],16);
	let g = parseInt(colors[1],16);
	let b = parseInt(colors[2],16);
	opacity = opacity === undefined ? 1 : opacity;
	return "rgba(" + r + "," + g + "," + b + "," + opacity + ");";
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
		let html = "";
		html += "<div id=\"jbn_booking_system\">";
		html += "	<div class=\"row\">";
		html += "		<div class=\"col-md-12 text-center month-name\">";
		html += "			<h1><i class=\"fa fa-spin fa-spinner\"></i> Loading Calendar...</h1>";
		html += "		</div>";
		html += "	</div>";
		html += "	<div class=\"row calendar_navigation\">";
		html += "		<div class=\"col-6\">";
		html += "			<div class=\"btn-group\" role=\"group\">";
		html += "				<button type=\"button\" class=\"btn btn-sm\">D<span class=\"shorter\">ay</span></button>";
		html += "				<button type=\"button\" class=\"btn btn-sm\">W<span class=\"shorter\">eek</span></button>";
		html += "				<button type=\"button\" class=\"btn btn-sm active\">M<span class=\"shorter\">onth</span></button>";
		html += "			</div>";
		html += "		</div>";
		html += "		<div class=\"col-6 text-right\">";
		html += "			<div class=\"btn-group mr-3\" role=\"group\">";
		html += "				<button type=\"button\" class=\"btn btn-sm\" id=\"prevMonth\"><i class=\"fa fa-chevron-left\"></i></button>";
		html += "				<button type=\"button\" class=\"btn btn-sm\" id=\"nextMonth\"><i class=\"fa fa-chevron-right\"></i></button>";
		html += "			</div>";
		html += "			<button type=\"button\" class=\"btn btn-sm\" id=\"today\"><i class=\"fa fa-calendar-o\"></i> <span class=\"shorter\">Today</span></button>";
		html += "		</div>";
		html += "	</div>";
		html += "	<div class=\"row seven-cols week-names\">";
		html += "		<div class=\"col-md-1 text-center\">S<span class=\"shorter\">un<span class=\"short\">day</span></span></div>";
		html += "		<div class=\"col-md-1 text-center\">M<span class=\"shorter\">on<span class=\"short\">day</span></span></div>";
		html += "		<div class=\"col-md-1 text-center\">T<span class=\"shorter\">ues<span class=\"short\">day</span></span></div>";
		html += "		<div class=\"col-md-1 text-center\">W<span class=\"shorter\">ed<span class=\"short\">nesday</span></span></div>";
		html += "		<div class=\"col-md-1 text-center\">T<span class=\"shorter\">hur<span class=\"short\">sday</span></span></div>";
		html += "		<div class=\"col-md-1 text-center\">F<span class=\"shorter\">ri<span class=\"short\">day</span></span></div>";
		html += "		<div class=\"col-md-1 text-center\">S<span class=\"shorter\">at<span class=\"short\">urday</span></span></div>";
		html += "	</div>";
		html += "	<div id=\"jbn_date_grid\"></div>";
		html += "</div>";
		$(this.container).append(html);
		this.bindControls();
		this.render();
	}else{
		this.generateDateGrid();
		console.log("Booking System Ready.");
	}
};

BookingSystem.prototype.bindControls = function(){
	let self = this;
	$('#today').click(function(){
		self.start_date = new Date();
		self.generateDateGrid();
	});
	$('#prevMonth').click(function(){
		self.start_date = new Date(self.start_date.getFullYear(),self.start_date.getMonth() - 1,1);
		self.generateDateGrid();
	});
	$('#nextMonth').click(function(){
		self.start_date = new Date(self.start_date.getFullYear(),self.start_date.getMonth() + 1,1);
		self.generateDateGrid();
	});
};

BookingSystem.prototype.generateDateGrid = function(){
	let html = "";
	let date = new Date(this.start_date.getFullYear(),this.start_date.getMonth(),1,0,0,0,0);
	let cmp = new Date();
	let max_day = new Date(this.start_date.getFullYear(),this.start_date.getMonth()+1,0,0,0,0,0).getDate();
	$('.month-name > h1').html((this.showFullMonths === false ? this.short_months[date.getMonth()] : this.months[date.getMonth()]) + " " + date.getFullYear());
	let start_block = date.getDay();
	let day = 1;
	let week = 1;
	html += "<div class=\"week row seven-cols\">";
	let last_month_start = new Date(this.start_date.getFullYear(),this.start_date.getMonth(),0,0,0,0).getDate() - start_block + 1;
	for(let d=0;d<start_block;d++){
		html += "<div class=\"day col-md-1 other-month\"><span class=\"date\">" + (last_month_start++) + "</span></div>";
	}
	for(let d=start_block;d<7;d++){
		html += "<div class=\"day col-md-1" + (d === this.today && this.start_date.getFullYear() === cmp.getFullYear() && this.start_date.getMonth() === cmp.getMonth() ? " today" : "") + "\"><span class=\"date\">" + (day++) + "</span></div>";
	}
	html += "</div>";
	let weekday = 0;
	let start_day = 1;
	for(let d=day;d<=max_day;d++){
		if(weekday === 0){
			html += "<div class=\"week row seven-cols\">";
		}
		html += "<div class=\"day col-md-1" + (d === this.today && this.start_date.getFullYear() === cmp.getFullYear() && this.start_date.getMonth() === cmp.getMonth() ? " today" : "") + "\"><span class=\"date\">" + d + "</span></div>";
		weekday++;
		if(weekday === 7){
			html += "</div>";
			weekday = 0;
			week++;
		}
		if(d === max_day){
			if(weekday > 0 && weekday < 7){

				for(let f=weekday;f<7;f++){
					html += "<div class=\"day other-month col-md-1\"><span class=\"date\">" + start_day++ + "</span></div>";
				}
				html += "</div>";
				week++;
			}
		}
	}

	if(week < 6){
		html += "<div class=\"week row seven-cols\">";
		for(let d=0;d<7;d++){
			html += "<div class=\"day col-md-1 other-month\"><span class=\"date\">" + start_day++ + "</span></div>";
		}
		html += "</div>";
	}

	$('#jbn_date_grid').html(html);
};
