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
                alert("Browser unsupported");
                return false;
            }
        }
    }

    var url = "http://localhost:8083/rentalunsecured/search-properties";
    if (city) {
        url += "?city=" + encodeURIComponent(city);
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200 && this.responseText) {
            var res = JSON.parse(this.responseText);
            var properties = JSON.parse(res['response']);
            console.log(properties);

            var container = document.getElementById("search_house");
            container.innerHTML = "";

            for (var i = 0; i < properties.length; i++) {
                var property = properties[i];
                var propertyData = JSON.parse(property.data); // Parse the `data` field

                container.innerHTML += `
                <div class="col-12">
                    <div class="search_house row">
                        <div class="col-md-3 house-img">
                            <img src="${property.image || 'images/house-5.png'}" alt="House Image">
                        </div>
                        <div class="col-md-9 house-info">
                            <p>${propertyData.type || 'Property Type'}</p>
                            <h3>${propertyData.streetAddress || 'Address'}, ${propertyData.city || ''}</h3>
                            <p>${propertyData.bedrooms || 'N/A'} bedroom(s) / ${propertyData.bathrooms || 'N/A'} bathroom(s) / ${propertyData.squareFeet || 'N/A'} sq ft</p>
                            <p>Furnishing: ${propertyData.furnishing || 'Not specified'}</p>
                            <p>Parking: ${propertyData.carParking || 'N/A'} (${propertyData.carParkingType || 'Not specified'})</p>
                            <div class="house-price">
                                <p>Rental Rate: ${propertyData.rentalRate || 'N/A'}</p>
                                <h4>$${propertyData.rentAmount || '0'} <span>/month</span></h4>
                            </div>
                            <p><strong>Terms:</strong> ${propertyData.termsAndConditions || 'Not specified'}</p>
                        </div>
                    </div>
                </div>
            `;
            
            }
        }
    };

    xmlhttp.send();
}
