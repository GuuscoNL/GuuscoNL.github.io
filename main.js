
function current_date() {
    let today = new Date();
    document.getElementById("year").value = today.getUTCFullYear() + 360;
    document.getElementById("month").value = today.getUTCMonth() + 1;
    document.getElementById("day").value = today.getUTCDate();
    document.getElementById("hour").value = today.getUTCHours();
    document.getElementById("minute").value = today.getUTCMinutes();
    document.getElementById("second").value = today.getUTCSeconds();
}
// At the beginning set the dates to the current time
current_date()

function calc() {
    let year = parseInt(document.querySelector("#year").value);
    let month = parseInt(document.querySelector("#month").value);
    let day = parseInt(document.querySelector("#day").value);
    let hour = parseInt(document.querySelector("#hour").value);
    let minute = parseInt(document.querySelector("#minute").value);
    let second = parseInt(document.querySelector("#second").value);

    // Stardate Configuration.
    let STARDATE_STANDARD_YEAR = 2323
    let STARDATE_START_YEAR = 0
    let MONTHTABLE = [
        0,
        31,
        59,
        90,
        120,
        151,
        181,
        212,
        243,
        273,
        304,
        334,
    ]

    // Check if current year is a leap year
    let n
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
        n = 366
    } else {
        n = 365
    }
    let monthOffset = MONTHTABLE[month - 1]
    let stardate = STARDATE_START_YEAR + (1000 * (year - STARDATE_STANDARD_YEAR)) + ((1000 / n) * (
        monthOffset +
        (day - 1) +
        (hour / 24) +
        (minute / (24 * 60) +
            (second / (24 * 3600)))
    ))
    stardate = stardate.toFixed(3)
    message = "Calculated stardate: " + stardate
    document.querySelector("#output").innerHTML = message;
}
calc();