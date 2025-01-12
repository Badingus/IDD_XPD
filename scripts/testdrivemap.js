// Select the element you want to attach the event listener to
const myElement = document.querySelector('.marker');
const closeButton = document.querySelector('.mapClose');

// Add an event listener to the element
myElement.addEventListener('click', function(event) {
    // This function will run when the element is clicked
    enableMap();
});

closeButton.addEventListener('click', function(event) {
    // This function will run when the element is clicked
    disableMap();
});
function enableMap()
{
    const mapOverlay = document.querySelector('.map-info');
    const blackOverlay = document.querySelector('.faded-gradient');
    mapOverlay.classList.remove("hidden");
    blackOverlay.classList.remove("hidden");
}

function disableMap()
{
    const mapOverlay = document.querySelector('.map-info');
    const blackOverlay = document.querySelector('.faded-gradient');
    blackOverlay.classList.add("hidden");
    mapOverlay.classList.add("hidden");
}