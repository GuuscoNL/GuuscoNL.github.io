var last_date;

function current_date() {
  let today = new Date();
  let rp_date = new Date(today.setFullYear(today.getFullYear() + 360));
  document.getElementById("datetime-input").value = rp_date
    .toISOString()
    .slice(0, 16);
  last_date = rp_date;
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
// At the beginning set the dates to the current time

function OnLostFocusDatetime() {
  let input_date_raw = document.getElementById("datetime-input").value;
  let input_date = new Date(input_date_raw);

  // In case a there were more days in the month entered
  if (input_date_raw == "") {
    console.log("oh no");
    input_date = last_date;
    input_date.setUTCDate(
      daysInMonth(input_date.getMonth(), input_date.getFullYear())
    );
  } else {
    last_date = input_date;
  } //FIXME:

  // Make sure the year is below 2323
  if (input_date.getUTCFullYear() < 2323) {
    let hour = input_date.getHours();
    let minute = input_date.getMinutes();

    input_date.setUTCFullYear(2323);

    // For some reason wants to go a few minutes back in time
    input_date.setUTCHours(hour);
    input_date.setUTCMinutes(minute);

    document.getElementById("datetime-input").value = input_date
      .toISOString()
      .slice(0, 16);
  }
  calc(input_date);
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// At the beginning set the dates to the current time
current_date();
