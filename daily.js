const epoch = new Date("2026-06-12"); // creation date
const today = new Date();
today.setHours(0, 0, 0, 0); // strip the time
let daysSince = Math.floor((today - epoch) / (1000 * 60 * 60 * 24));

// put ?day= to test
const params = new URLSearchParams(window.location.search);
daysSince = params.get("day") !== null 
    ? parseInt(params.get("day")) 
    : Math.floor((today - epoch) / (1000 * 60 * 60 * 24));

try {
    const xmlhttp = new XMLHttpRequest(); // new request
    xmlhttp.onload = function() { // this runs once we get data
        const adages = this.responseText.split("\n"); // parse what we get

        let quote = adages[daysSince % adages.length];

        document.getElementById("the-quote").innerHTML = quote
    }
    xmlhttp.open("GET", "https://docs.google.com/spreadsheets/d/1M3sCGpnPwdh9X3zPZa0mYbKklQS4zxBGQsjYHnOPD4w/export?format=csv", true /*async*/);
    xmlhttp.send();
} catch(err) {
    alert(err.message)
}