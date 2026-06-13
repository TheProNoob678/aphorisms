next() //give an initial quote

var index = null
const params = new URLSearchParams(window.location.search);

document.getElementById("next").addEventListener("click", next)
document.getElementById("the-quote").addEventListener("click", next)

function next() {
    try {
        const xmlhttp = new XMLHttpRequest(); // new request
        xmlhttp.onload = function() { // this runs once we get data
            const adages = this.responseText.split("\n"); // parse what we get
            var lastIndex = index
            if (index == null) {
                if (params.get("index") != null) {
                    index = params.get("index")
                }
            }
            while (lastIndex == index) { // don't want duplicates
                index = Math.floor((Math.random() * (adages.length)))
            }
            history.pushState(null, "", "?index=" + index)
            document.getElementById("the-quote").innerHTML = adages[index]
        }
        xmlhttp.open("GET", "https://docs.google.com/spreadsheets/d/1M3sCGpnPwdh9X3zPZa0mYbKklQS4zxBGQsjYHnOPD4w/export?format=csv", true /*async*/);
        xmlhttp.send();
    } catch(err) {
        alert(err.message)
    }
}
