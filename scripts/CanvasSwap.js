const canvas = document.querySelector('.canvas-container.hotspot-selector');
let originalDisplay = '';
    const buttons = document.querySelectorAll('.canvas-swap.interactable');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
          swapCanvases();  // toggles canvas swap
        });
      });


var configOn = false;

function swapCanvases() {
    console.log(canvas);
    if (!originalDisplay) {
        originalDisplay = window.getComputedStyle(canvas).display;
    }
    
    if (!configOn) {
        // Hide the canvas by setting display to "none"
        canvas.style.display = "none";
        configOn = true;
    } else {
        // Restore the original display value
        canvas.style.display = originalDisplay || "block";  // Default to "block" if not set
        configOn = false;
    }
}
