let rpm = 0; // Current RPM
    let isIncreasing = false; // Whether "E" key is being pressed
    let animationRunning = false; // Tracks if animation is already running
    const maxRPM = 400; // Maximum RPM
    const rpmElement = document.getElementById("rpm");
    const targetDiv = document.getElementById("targetDiv");

    const engineImg = document.getElementById("Engine-Audio")
    
    let isInsideDiv = false; // Tracks whether the cursor is inside the div

    // Audio variables
    let audioContext;
    let engineAudioBuffer;
    let audioSource;

    // Load the custom engine sound effect
    function loadEngineSound() {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      fetch("./audio/engine-sound.mp3") // Replace with the path to your sound file
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
          engineAudioBuffer = buffer;
        })
        .catch(error => console.error("Error loading audio file:", error));
    }

    // Function to start playing the engine sound
    function startEngineSound() {
      if (audioSource) {
        stopEngineSound(); // Stop any existing sound before starting a new one
      }
      if (engineAudioBuffer) {
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = engineAudioBuffer;
        audioSource.loop = true; // Loop the sound to keep it playing
        audioSource.connect(audioContext.destination);
        audioSource.start(0);
      }
    }

    // Function to stop playing the engine sound
    function stopEngineSound() {
      if (audioSource) {
        console.log("nballs");
        audioSource.stop();
        audioSource.disconnect();
        audioSource = null;
      }
    }

    // Function for linear interpolation
    function lerp(start, end, t) {
      return start + (end - start) * t;
    }

    // Animation loop
    function animate() {
      if (isIncreasing) {
        rpm = lerp(rpm, Math.min(rpm + 10, maxRPM), 0.1); // Increase RPM, clamp at maxRPM
      } else {
        rpm = lerp(rpm, 0, 0.01);
       // Decrease RPM gradually to 0
      }

      // Clamp RPM to be within 0 and maxRPM
      rpm = Math.min(rpm, maxRPM);

      // Update the displayed RPM (rounded for display purposes)
      rpmElement.textContent = Math.round(rpm);

      // Continue the animation if RPM is not yet 0 or increasing
      if (rpm > 0.5) {
        requestAnimationFrame(animate);
        console.log(rpm);
      } else {
        console.log("stop");
        animationRunning = false; // Stop the animation when RPM reaches 0
        stopEngineSound(); // Stop sound when RPM is 0
        engineImg.classList.remove("lit");
      }
    }

    // Listen for mouseenter and mouseleave to track focus
    targetDiv.addEventListener("mouseenter", () => {
      isInsideDiv = true;
      console.log("mouse in div");
    });

    targetDiv.addEventListener("mouseleave", () => {
      isInsideDiv = false;
    });

    // Listen for keydown events
    document.addEventListener("keydown", (event) => {
      if (isInsideDiv && event.key.toLowerCase() === "e") {
        if (!isIncreasing) {
          isIncreasing = true; // Start increasing RPM
          if (!animationRunning) {
            animationRunning = true; // Prevent multiple animations
            startEngineSound(); // Start custom sound
            animate(); // Start the animation
            engineImg.classList.add("lit");
          }
        }
      }
    });

    // Listen for keyup events
    document.addEventListener("keyup", (event) => {
      if (event.key.toLowerCase() === "e") {
        isIncreasing = false; // Stop increasing RPM
      }
    });

    // Load the engine sound effect when the page loads
    window.onload = loadEngineSound;

