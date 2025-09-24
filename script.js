document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // Boot screen and binary background
  const progressBar = document.querySelector(".progress-bar");
  const binaryCanvas = document.getElementById("binary-bg");
  const ctx = binaryCanvas.getContext("2d");

  // Set canvas size
  binaryCanvas.width = window.innerWidth;
  binaryCanvas.height = window.innerHeight;

  // Binary background animation
  const fontSize = 16;
  const columns = binaryCanvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(0);

  function drawBinary() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, binaryCanvas.width, binaryCanvas.height);
    ctx.fillStyle = "lime";
    ctx.font = `${fontSize}px Courier New`;
    for (let i = 0; i < drops.length; i++) {
      const text = Math.random() > 0.5 ? "1" : "0";
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      if (y > binaryCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // Start animation after boot screen
  setTimeout(() => {
    binaryCanvas.style.display = "block";
    setInterval(drawBinary, 50);
  }, 2200);

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    binaryCanvas.width = window.innerWidth;
    binaryCanvas.height = window.innerHeight;
    drops.length = Math.floor(binaryCanvas.width / fontSize);
    drops.fill(0);
  });

  // Progress bar animation
  setTimeout(() => {
    if (progressBar) {
      progressBar.style.width = "100%";
    } else {
      console.error("Progress bar not found");
    }
  }, 100);

  // Remove boot screen
  setTimeout(() => {
    const bootScreen = document.getElementById("boot-screen");
    if (bootScreen) {
      bootScreen.style.display = "none";
    } else {
      console.error("Boot screen not found");
    }
  }, 2200);

  // Open/close windows
  const icons = document.querySelectorAll(".icon");
  console.log(`Found ${icons.length} icons`);

  icons.forEach((icon, index) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const windowId = icon.getAttribute("data-window");
      console.log(`Icon ${index} clicked, targeting window: ${windowId}`);
      const win = document.getElementById(windowId);
      if (win) {
        console.log(`Opening window: ${windowId}`);
        win.style.display = "block";
        win.style.zIndex = Date.now();
      } else {
        console.error(`Window with ID ${windowId} not found`);
      }
    });
  });

  // Close windows
  const closes = document.querySelectorAll(".close");
  console.log(`Found ${closes.length} close buttons`);

  closes.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Close button ${index} clicked`);
      const window = e.target.closest(".window");
      if (window) {
        window.style.display = "none";
      } else {
        console.error("Window not found for close button");
      }
    });
  });

  // Drag windows
  document.querySelectorAll(".window").forEach((win) => {
    const header = win.querySelector(".window-header");
    let isDragging = false, offsetX, offsetY;

    header.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      win.style.zIndex = Date.now();
      console.log(`Dragging window: ${win.id}`);
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  });

  // Fallback for manual testing
  window.toggleWindow = function (windowId) {
    const win = document.getElementById(windowId);
    if (win) {
      win.style.display = win.style.display === "block" ? "none" : "block";
      console.log(`Toggled window: ${windowId}`);
    } else {
      console.error(`Test toggle failed: Window ${windowId} not found`);
    }
  };
});