//let latitude, longitude = "";
let latitude = "";
let longitude = "";


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

} else {
    alert("Geolocation is not supported by this browser.");
}

function onSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    initMap();

    const api_key = "2db9502e0cb46b68c384497d55a55b8";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            let details = result.results[0].components;

            let { country, postcode, province } = details;

            document.getElementById("result").innerHTML = `
            <p>ülke: ${country}</p>
            <p>posta kodu: ${postcode}</p>
            <p>şehir: ${province}</p>
            `;
        });
}

function onError() {
    if (error.code == 1) {
        alert("kullanıcı erişimi reddetti.")
    }
    else {
        alert("Bir hata oluştu.");
    }

}

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 8,
    });

    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
    });
}


window.initMap = initMap;