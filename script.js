let btn = document.querySelector(".btn-primary");
let qr_code_element = document.querySelector(".qr-image");
let qr_code_container = document.querySelector(".result-section");

btn.addEventListener("click", () => {
  let user_input = document.querySelector("#input_text");
  let error_message = document.querySelector("#error-message");
  if (user_input.value != "") {
    error_message.style.display = "none";
    qr_code_container.style.display = "flex";
    btn.disabled = true;
    btn.innerHTML = "Generating...";
    if (qr_code_element.childElementCount == 0) {
      generate(user_input, btn);
    } else {
      qr_code_element.innerHTML = "";
      generate(user_input, btn);
    }
  } else {
    error_message.innerHTML = "Please enter a URL or text to generate a QR code.";
    error_message.style.display = "block";
    qr_code_element.innerHTML = "";
    // Add placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'qr-placeholder';
    placeholder.innerHTML = `
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="80" height="80" fill="#E2E8F0" stroke="#D1D5DB" stroke-width="2"/>
        <rect x="30" y="30" width="20" height="20" fill="#9CA3AF"/>
        <rect x="70" y="30" width="20" height="20" fill="#9CA3AF"/>
        <rect x="30" y="70" width="20" height="20" fill="#9CA3AF"/>
        <rect x="70" y="70" width="20" height="20" fill="#9CA3AF"/>
        <rect x="50" y="50" width="20" height="20" fill="#D1D5DB"/>
        <rect x="30" y="50" width="20" height="20" fill="#D1D5DB"/>
        <rect x="50" y="30" width="20" height="20" fill="#D1D5DB"/>
      </svg>
      <p>Your QR will appear here.</p>
    `;
    qr_code_element.appendChild(placeholder);
  }
});

function generate(user_input, btn) {
  qr_code_element.style = "";
  
  // 1. CLEAR PREVIOUS TITLE
  qr_code_element.removeAttribute("title");

  // 2. Generate QR Code
  let qrcode = new QRCode(qr_code_element, {
    text: `${user_input.value}`,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H // High Error Correction is crucial for logos
  });

  // 3. Create Buttons
  let download_link = document.createElement("a");
  download_link.classList.add("btn-primary", "download-button");
  download_link.setAttribute("download", "qr_code_with_logo.png");
  download_link.innerHTML = `⬇️ Download`;
  qr_code_element.appendChild(download_link);

  let regenerate = document.createElement("button");
  regenerate.innerHTML = "Generate New QR";
  regenerate.classList.add("btn-secondary", "regenerate-button");
  qr_code_element.appendChild(regenerate);

  regenerate.addEventListener("click", () => {
    qr_code_element.innerHTML = "";
    document.querySelector("#input_text").value = "";
    document.querySelector("#error-message").style.display = "none";
    
    // Re-add placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'qr-placeholder';
    placeholder.innerHTML = `
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="80" height="80" fill="#E2E8F0" stroke="#D1D5DB" stroke-width="2"/>
        <rect x="30" y="30" width="20" height="20" fill="#9CA3AF"/>
        <rect x="70" y="30" width="20" height="20" fill="#9CA3AF"/>
        <rect x="30" y="70" width="20" height="20" fill="#9CA3AF"/>
        <rect x="70" y="70" width="20" height="20" fill="#9CA3AF"/>
        <rect x="50" y="50" width="20" height="20" fill="#D1D5DB"/>
        <rect x="30" y="50" width="20" height="20" fill="#D1D5DB"/>
        <rect x="50" y="30" width="20" height="20" fill="#D1D5DB"/>
      </svg>
      <p>Your QR will appear here.</p>
    `;
    qr_code_element.appendChild(placeholder);
  });

  // 4. Wait for library to render, then Draw Logo & Reset Button
  setTimeout(() => {
    let qr_code_img = qr_code_element.querySelector("img");
    let qr_code_canvas = qr_code_element.querySelector("canvas");

    // Ensure we have a canvas to draw on
    if (!qr_code_canvas && qr_code_img) {
        qr_code_canvas = document.createElement("canvas");
        qr_code_canvas.width = qr_code_img.width;
        qr_code_canvas.height = qr_code_img.height;
        let ctx = qr_code_canvas.getContext("2d");
        ctx.drawImage(qr_code_img, 0, 0);
    }

    if (qr_code_canvas) {
        let ctx = qr_code_canvas.getContext("2d");
        
        // Load the Logo
        let logo = new Image();
        logo.src = 'logo-icon.png'; // Using your square icon
        logo.crossOrigin = "Anonymous";
        
        logo.onload = function() {
            // Calculate Logo Size (approx 20-25% of QR code)
            let logoSize = 40; 
            let xPos = (qr_code_canvas.width - logoSize) / 2;
            let yPos = (qr_code_canvas.height - logoSize) / 2;

            // Draw White Background Square (Safe Zone)
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(xPos - 2, yPos - 2, logoSize + 4, logoSize + 4);

            // Draw Logo Image
            ctx.drawImage(logo, xPos, yPos, logoSize, logoSize);

            // Update Download Link with combined image
            let combinedImageURL = qr_code_canvas.toDataURL("image/png");
            download_link.setAttribute("href", combinedImageURL);

            // Optional: Update the visible image on screen to match
            if (qr_code_img) {
                qr_code_img.src = combinedImageURL;
            }
        };

        // Fallback if logo fails to load
        logo.onerror = function() {
            download_link.setAttribute("href", qr_code_canvas.toDataURL("image/png"));
        };
    }

    // Reset Generate Button
    btn.disabled = false;
    btn.innerHTML = "Generate";
  }, 300);
}