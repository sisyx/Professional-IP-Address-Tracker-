const input = document.querySelector('input');
const goBtn = document.querySelector('.go-btn');
const ipAddressText = document.querySelector('.ip-info--adress--result-text');
const ipLocationText = document.querySelector('.ip-info--location--result-text');
const ipTimezoneText = document.querySelector('.ip-info--timezone--result-text');
const ipIspText = document.querySelector('.ip-info--isp--result-text');
const popupInput = document.querySelector('.popup-label input');
const popupOkBtn = document.querySelector('.popup-ok-btn');
const popupCloseBtn = document.querySelector('.popup-close-btn');
let apiKey;



// storing data
if (localStorage.getItem('apiKey')) {
    apiKey = localStorage.getItem('apiKey');
    removePopup();
} else {
    createPopup();
}

// events

popupOkBtn.addEventListener('click', event => {
    if (popupInput.value.length !== 0) {
        apiKey = popupInput.value;
        localStorage.setItem('apiKey', apiKey);
        popupInput.classList.remove('inavlid-input');
        removePopup();
    } else {
        popupInput.classList.add('invalid-input');
    }
})
popupInput.addEventListener('input', event => {
    event.target.classList.remove('invalid-input');
})
popupCloseBtn.addEventListener('click', event => {
    removePopup();
})

goBtn.addEventListener('click', event => {
    main();    
})

input.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        main();
    }
})

// functions


async function main() {
    const ipAddress = input.value;
    setDefaultData();
    activeAnimation();
    emptyMap();
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    let response = fetch(url);
    response.then(response => response.json())
    .then(data => {
        if (!checkApiKey(data)) { delete localStorage.apiKey; }
        ipAddressText.innerHTML = getIpAdress(data);
        ipLocationText.innerHTML = getIpLocation(data);
        ipTimezoneText.innerHTML = getIpTimezone(data);
        ipIspText.innerHTML = getIpIsp(data);
        mapTheCoords(data.location.lat, data.location.lng);
        deActiveAnimation();
    }).catch(error => {
        setTimeout(deActiveAnimation, 1000);
    });
}

function getIpIsp(data) {
    return data.isp;
}

function getIpTimezone(data) {
    return `UTC ${data.location.timezone}`;
}

function getIpAdress(data) {
    return data.ip;
}

function getIpLocation(data) {
    return `${data.location.city}, ${data.location.country}`
}


function deActiveAnimation() {
    document.querySelectorAll('.ip-info--title').forEach(title => {
        title.classList.remove('active');
    })
    document.querySelectorAll('.ip-info--result').forEach(result => {
        result.classList.remove('active');
    })    
}
function activeAnimation() {
    document.querySelectorAll('.ip-info--title').forEach(title => {
        title.classList.add('active');
    })
    document.querySelectorAll('.ip-info--result').forEach(result => {
        result.classList.add('active');
    })
}


function setDefaultData() {
    ipAddressText.innerHTML = 'unkown';
    ipLocationText.innerHTML = 'unkown';
    ipTimezoneText.innerHTML = 'unkown';
    ipIspText.innerHTML = 'unkown';
}

function removePopup() {
    document.querySelector('.access_key-popup-container').style.display = 'none';
    document.querySelector('.popup-blur-bg').style.display = 'none';
}
function createPopup() {
    document.querySelector('.access_key-popup-container').style.display = 'grid';
    document.querySelector('.popup-blur-bg').style.display = 'block';
}

function checkApiKey(data) {
    if (data.code >= 400 && data.code <= 500) {
        return false;
    } else {
        return true;
    }
}