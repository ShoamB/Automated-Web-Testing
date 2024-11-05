toggleButton.addEventListener("click", () => {
toggleTheme();
});

function toggleTheme() {
const storedTheme = localStorage.getItem('theme');
const selectedTheme = storedTheme === "dark" ? "light" : "dark";
localStorage.setItem('theme', selectedTheme);
applyStoredTheme();
}

function applyStoredTheme() {
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
document.querySelector(`input[name="theme"][value="${storedTheme}"]`).checked = true;
setTheme();
}
}
function setTheme() {
const selectedTheme = document.querySelector('input[name="theme"]:checked').value;
localStorage.setItem('theme', selectedTheme);
document.body.classList.toggle("dark-theme", selectedTheme === "dark");
}
window.addEventListener('load', applyStoredTheme);

function search() {
const urlInput = document.getElementById('url');
const url = urlInput.value;
}

let testingCancelled = false;
function cancelTesting() {
testingCancelled = true;
document.getElementById('cancelText').style.display = 'none';
document.querySelector('.loading').style.display = 'none';
}

const urlInput = document.getElementById('url');
const start = document.querySelector('.start');
const loadingContainer = document.querySelector('.loading-container');
const result = document.querySelector('.result');
const exitIcon = document.getElementById('exitIcon');
const tab = document.getElementById('tab');
const tripleLineIcon = document.getElementById('triple-line-icon');
const wrapper = document.getElementById('wrapper');

////////////////////////////////////////////////////////////////////////////////////////////////////
let lastCheckboxTriedToUncheck = null;

const inputsCheckbox = document.getElementById('inputs-checkbox');
const dropdownoptionsCheckbox = document.getElementById('dropdownoptions-checkbox');
const buttonsCheckbox = document.getElementById('buttons-checkbox'); // Added this line

function updateInputsLocalStorage() {
    localStorage.setItem('inputsCheckbox', inputsCheckbox.checked);
    console.log('inputsCheckbox updated to:', inputsCheckbox.checked);
}

function loadInputsFromLocalStorage() {
    const storedValue = JSON.parse(localStorage.getItem('inputsCheckbox'));
    if (storedValue !== null) {
        inputsCheckbox.checked = storedValue;
        console.log('Loaded inputsCheckbox:', inputsCheckbox.checked);
    }
}

function updateDropdownoptionsLocalStorage() {
    localStorage.setItem('dropdownoptionsCheckbox', dropdownoptionsCheckbox.checked);
    console.log('dropdownoptionsCheckbox updated to:', dropdownoptionsCheckbox.checked);
}

function loadDropdownoptionsFromLocalStorage() {
    const storedValue = JSON.parse(localStorage.getItem('dropdownoptionsCheckbox'));
    if (storedValue !== null) {
        dropdownoptionsCheckbox.checked = storedValue;
        console.log('Loaded dropdownoptionsCheckbox:', dropdownoptionsCheckbox.checked);
    }
}

function updateButtonsLocalStorage() {
    localStorage.setItem('buttonsCheckbox', buttonsCheckbox.checked);
    console.log('buttonsCheckbox updated to:', buttonsCheckbox.checked);
}

function loadButtonsFromLocalStorage() {
    const storedValue = JSON.parse(localStorage.getItem('buttonsCheckbox'));
    if (storedValue !== null) {
        buttonsCheckbox.checked = storedValue;
        console.log('Loaded buttonsCheckbox:', buttonsCheckbox.checked);
    }
}

function ensureAtLeastOneChecked(checkbox) {
    if (!inputsCheckbox.checked && !dropdownoptionsCheckbox.checked && !buttonsCheckbox.checked) {
        lastCheckboxTriedToUncheck = checkbox;
        checkbox.checked = true;
    }
}

inputsCheckbox.addEventListener('change', () => {
    updateInputsLocalStorage();
    ensureAtLeastOneChecked(inputsCheckbox);
});

dropdownoptionsCheckbox.addEventListener('change', () => {
    updateDropdownoptionsLocalStorage();
    ensureAtLeastOneChecked(dropdownoptionsCheckbox);
});

buttonsCheckbox.addEventListener('change', () => {
    updateButtonsLocalStorage();
    ensureAtLeastOneChecked(buttonsCheckbox);
});

window.addEventListener('beforeunload', () => {
    updateInputsLocalStorage();
    updateDropdownoptionsLocalStorage();
    updateButtonsLocalStorage();
});

loadInputsFromLocalStorage();
loadDropdownoptionsFromLocalStorage();
loadButtonsFromLocalStorage(); // Added this line

//////////////////////////////////////////////////////////////////////////////////////////////////

start.style.display = 'none';
exitIcon.style.display = 'none';
tab.style.display = 'none';

urlInput.addEventListener('input', function () {
    const url = urlInput.value;
    if (url.trim() !== '' && /^https?:\/\/.*/.test(url)) {
        start.style.display = 'block';
    } else {
        start.style.display = 'none';
    }
});

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    start.style.display = 'none';
    loadingContainer.style.display = 'block';

    fetch('/test', {
        method: 'POST',
        body: new FormData(this),
    })
        .then((response) => response.json())
        .then((data) => {
            loadingContainer.style.display = 'none';
            document.getElementById("error").innerHTML = data.error || '';

            if (data.result) {
                exitIcon.style.display = 'block';
                tab.style.display = 'block';
    
                if (data.result.includes("𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱:")) {
                    result.style.color = "red";
                    result.style.borderColor = "red";
                    if (data.error.includes("𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱:")) {
                        // Handle specific case
                    } else {
                        // Handle another case
                    }
                } else {
                    result.style.color = "#00b388";
                }
    
                result.textContent = data.result;
                result.style.display = 'block';
                start.style.display = 'none';
            }
    
        })
        .catch((error) => {
            loadingContainer.style.display = 'none';
            console.error('An error occurred:', error);
            result.style.color = "red";
            result.textContent = 'An error occurred: ' + (error || '');
            result.style.display = 'block';
            start.style.display = 'block';
        });
    });

function storeLastBrowserOption(browserOption) {
localStorage.setItem('lastBrowserOption', browserOption);
}
function getLastBrowserOption() {
return localStorage.getItem('lastBrowserOption');
}
function applyStoredBrowserOptions() {
const storedBrowserOption = getLastBrowserOption();
if (storedBrowserOption) {
document.querySelector(`input[name="browser"][value="${storedBrowserOption}"]`).checked = true;
}
}
window.addEventListener('load', applyStoredBrowserOptions);
document.querySelectorAll('input[name="browser"]').forEach(function (radio) {
radio.addEventListener('change', function () {
storeLastBrowserOption(this.value);
});
});

document.querySelector('.triple-line-icon').addEventListener('click', function (e) {

e.preventDefault();
var dropdownContent = document.querySelector('.dropdown-content');
dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
});

var testingOptions = document.querySelector('.testing-options');
var browserOptions = document.querySelector('.browser-options');
testingOptions.addEventListener('click', function (e) {
e.stopPropagation();
});


let isWrapperVisible = false;
tripleLineIcon.addEventListener('click', () => {
isWrapperVisible = !isWrapperVisible;
if (isWrapperVisible) {
wrapper.style.display = 'block';
setTimeout(() => {
wrapper.style.opacity = '1';
wrapper.style.left = '0';
}, 10);
tripleLineIcon.style.transform = 'rotate(180deg)';
} else {
wrapper.style.opacity = '0';
wrapper.style.left = '-250px';
setTimeout(() => {
wrapper.style.display = 'none';
}, 100);
tripleLineIcon.style.transform = 'rotate(0deg)';
}
});



