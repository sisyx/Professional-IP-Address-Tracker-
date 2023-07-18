function mapTheCoords(latitude, langitude) {
    var mymap = L.map('mapid');

    mymap.setView([latitude, langitude], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    
    var marker = L.marker([latitude, langitude]).addTo(mymap);
    mymap.on('locationfound', marker);
}

function emptyMap() {
   // create a new element
    var newElement = document.createElement('div');
    newElement.id = 'mapid';

    // get the existing element
    var existingElement = document.getElementById('mapid');

    // append the new element as the next sibling of the existing element
    existingElement.insertAdjacentElement('afterend', newElement);

    document.querySelector('#mapid').remove();
}