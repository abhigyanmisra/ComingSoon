function getAllProperties(city) {
    var xmlhttp;
    try {
        xmlhttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("BROWSER BROKE");
                return false;
            }
        }
    }

    // Construct the URL with or without the city parameter
    var url = "http://localhost:8083/rentalunsecured/search-properties";
    if (city) {
        url += "?city=" + encodeURIComponent(city);
    }
    alert("Requesting URL: " + url);

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200 && this.responseText != null && this.responseText != "") {
            var res = JSON.parse(this.responseText);
            var response = JSON.parse(res['response']);
            console.log(response);
            // document.getElementById("ipaddress").value = res.response
        } 
    };

    xmlhttp.send();
}