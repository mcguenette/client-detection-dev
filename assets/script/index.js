'use-strict';

// USE the following to replace document.queryselector & queryselectorAll
function target(selector, parent = document) {
    return parent.querySelector(selector);
};

function targetAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
};

// the other way we did yesterday it spit out a console error so googled a new way to handle it
const onEvent = (target, event, callback, ...options) => {
    return target.addEventListener(event, callback, ...options);
  };
  

// SYSTEM functions
const os = target('.os');
const language = target('.language');
const browser = target('.browser');

// GET OS from navigator.userAgent
function setOS(osName) {
    switch (true) {
        case /MacIntel/.test(navigator.userAgent):
            osName = 'Mac';
            break;
        case /Windows/.test(navigator.userAgent):
            osName = 'Windows';
            break;
        default:
            osName = 'Not available';
            break;    
    }
    os.innerText = `${osName}`;
};

// GET language from navigator.language
function setLanguage(languageName) {
    switch (true) {
        case /en-CA/.test(navigator.language):
            languageName = 'en-can';
            break;
        case /en/.test(navigator.language):
            languageName = 'en';
            break;
        default:
            languageName = 'Not available';
            break;
    }
    language.innerText = `${languageName}`;
};

// GET Browser from navigator.userAgent
function setBrowser(browserName) {
    switch (true) {
        case /Edg/.test(navigator.userAgent):
            browserName = 'Edge';
            break;
        case /Chrome/.test(navigator.userAgent):
            browserName = 'Chrome';
            break;
        case /Firefox/.test(navigator.userAgent):
            browserName = 'Firefox';
            break;
        default:
            browserName = 'Not available';
            break;
    }
    browser.innerText = `${browserName}`;
};

// WINDOW functions
const pageWidth = target('.width');
const pageHeight = target('.height');
const orientParagraph = target('.orientation');

// GET current windows width and height
function setWindowDimensions() {
    pageWidth.innerText = `${window.innerWidth}px`;
    pageHeight.innerText = `${window.innerHeight}px`;
};

// GET orientation
function setOrientation() {
    const orient = window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait';
    orientParagraph.textContent = `${orient}`;
};

// BATTERY functions
const batteryLevel = target('.level');
const batteryStatus = target('.status');
const wifiConnection = target('.connection');

// GET battery info
if ('getBattery' in navigator) {
// using a promise .then
navigator.getBattery().then((battery) => {
    const updateAllBatteryInfo = () => {
    updateLevelInfo();
    updateChargeInfo();
    };
    const updateLevelInfo = () => {
        batteryLevel.innerText = `${Math.round(battery.level * 100)}%`;
    };
    const updateChargeInfo = () => {
        batteryStatus.innerText = `${battery.charging ? 'Charging' : 'Idle'}`;
    };

    updateAllBatteryInfo();

        onEvent(battery, 'levelchange', updateLevelInfo);
        onEvent(battery, 'chargingchange', updateChargeInfo);
});
} else {
    batteryLevel.innerText = `not available`;
    batteryStatus.innerText = `not available`;
}

// Get info on navigator.onLine and then add and remove class to update background color
// for the button
function updateConnection() {
    const onlineStatus = wifiConnection.innerText = `${navigator.onLine ? 'Online' : 'Offline'}`;
    if (onlineStatus === 'Offline') {
        wifiConnection.classList.add('offline'); // Add 'offline'
    } else {
        wifiConnection.classList.remove('offline'); // Remove 'offline' 
    }
};
        onEvent(window, 'online', updateConnection);
        onEvent(window, 'offline', updateConnection);

// Display everything on page load
onEvent(window, 'load', () => {
    setOS();
    setLanguage();
    setBrowser();
    setWindowDimensions();
    setOrientation();
    updateConnection();
});

// Update width and height on window resize & orientation
onEvent(window, 'resize', () => {
    setWindowDimensions();
    setOrientation();
});



