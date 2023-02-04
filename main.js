function current_date() {
	let today = new Date();
	let rp_date = new Date(today.setFullYear(today.getFullYear() + 360));
	document.getElementById("date-input").value = rp_date
		.toISOString()
		.split("T")[0];

	document.getElementById("time-input").value = rp_date
		.toISOString()
		.split("T")[1]
		.slice(0, -8);
	// At the beginning set the dates to the current time
	calc(rp_date);
}

function calc(input_date) {
	// Get input
	let year = input_date.getUTCFullYear();
	let month = input_date.getUTCMonth();
	let day = input_date.getUTCDate();
	let hour = input_date.getUTCHours();
	let minute = input_date.getUTCMinutes();
	let second = input_date.getUTCSeconds();

	// Stardate Configuration.
	let STARDATE_STANDARD_YEAR = 2323;
	let STARDATE_START_YEAR = 0;
	let MONTHTABLE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

	// Check if current year is a leap year
	let n;
	if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
		n = 366;
	} else {
		n = 365;
	}

	let monthOffset = MONTHTABLE[month];
	let stardate =
		STARDATE_START_YEAR +
		1000 * (year - STARDATE_STANDARD_YEAR) +
		(1000 / n) *
			(monthOffset +
				(day - 1) +
				hour / 24 +
				(minute / (24 * 60) + second / (24 * 3600)));
	stardate = stardate.toFixed(3);
	let message = "Calculated stardate: " + stardate;
	document.querySelector("#output").innerHTML = message;
}

function OnLostFocusDate() {
	let input_date_raw = document.getElementById("date-input").value;
	let input_date = new Date(input_date_raw);
	let input_time_raw = document.getElementById("time-input").value.split(":");
    
	input_date.setUTCHours(Number(input_time_raw[0]));
    input_date.setUTCMinutes(Number(input_time_raw[1]));
    input_date.setUTCSeconds(0)
    console.log(input_date)
	// In case a there were more days in the month entered
	if (input_date_raw == "") {
		console.log("oh no");
		document.querySelector("#output").innerHTML =
			"Calculated stardate: Invalid date";
		return;
	}

	// Make sure the year is below 2323
	if (input_date.getUTCFullYear() < 2323) {
		input_date.setUTCFullYear(2323);

		document.getElementById("date-input").value = input_date
			.toISOString()
			.split("T")[0];
	}
	calc(input_date);
}

// At the beginning set the dates to the current time
current_date();
