# WeLoveQRcodes

WeLoveQRcodes is a small, client-side QR code generator built with qrcodejs. It provides a minimal UI to enter text, generate a QR code, and download it as a PNG. The project is intended as a simple static web app (index.html + script.js + styles.css) that can be hosted anywhere (GitHub Pages, Netlify, static server).

Live demo
- (If you enable GitHub Pages for this repo you can place the site at `https://<your-username>.github.io/weloveqrcode/`)

Features
- Enter any text or URL and generate a QR code in the browser
- PNG download button generated automatically after QR creation
- Small, dependency-free UI (uses qrcodejs from CDN)
- Simple, responsive layout and basic styling

Repository structure
- index.html — main HTML page with the UI and script includes
- script.js — QR generation logic and download behavior
- styles.css — styling for layout and appearance
- (optional) README.md — this file
- (optional) LICENSE — add a license file if you want to publish

Quick start (local)
1. Clone the repository:
   git clone https://github.com/aslivashu/weloveqrcode.git
2. Open the site:
   - Simple: Open index.html in your browser (double‑click or drag file)
   - Recommended (serves over HTTP): run a local server:
     - Python 3: python -m http.server 8000
     - Then open http://localhost:8000 in your browser

Usage
1. Type text or a URL into the input field.
2. Click the "Generate" button.
3. A QR image appears and a "Download" button is added below it. Click the Download button to save a PNG copy.

How the app works (short overview)
- index.html includes qrcodejs via CDN and app's script.js.
- script.js:
  - Listens for the Generate button click.
  - Reads the input value and calls generate(user_input).
  - The generate(user_input) function creates a new QRCode instance in the .qr-code container with options:
    - width/height: 180
    - colorDark: #000000, colorLight: #ffffff
    - correctLevel: QRCode.CorrectLevel.H
  - After the QR is rendered the script creates a Download button and sets the download link to the data URL from either the generated <img> or <canvas>.

Customizing the generator
- Change size: edit the width and height options in script.js.
- Change colors: set colorDark and colorLight.
- Change error correction level: modify correctLevel (L, M, Q, H).
- Replace qrcodejs with another library if you need more features (logo embedding, SVG output, better accessibility).

Notes, improvements & suggestions
- The current code creates a new Download button each time a QR is generated; the script attempts to clear the .qr-code container before generating but you may want to explicitly remove any previous download button to avoid duplicates.
- The download link is set using setTimeout to wait for the library to finish rendering. A robust approach is to detect whether the library returned an <img> or <canvas> element directly and use its availability rather than relying on setTimeout.
- Accessibility: add labels and ARIA attributes for the input and buttons; make sure color contrast meets WCAG for users with low vision.
- Validation: handle and show user feedback for empty input (rather than console.log).
- Prevent XSS: qrcodejs encodes the input into QR binary data so it does not directly render user strings as HTML, but sanitize/validate if you display the raw input elsewhere.

Potential bug to watch
- script.js calls generate({ value: "https://codepen.io/coding_dev_" }) at the bottom for an initial demo. That works because generate expects an object with a `.value` property (or an input element with `.value`). If you refactor generate to accept just a string, update that call accordingly.

Contributing
- Contributions are welcome. Suggested steps:
  1. Fork the repo.
  2. Create a new branch: git checkout -b feat/some-feature
  3. Make changes, add tests/docs if necessary.
  4. Open a pull request describing your changes.

License
- Add a LICENSE file to the repo. If you want permissive reuse, add an MIT license (common choice).

How to add this README to the repository
- Create a branch and open a PR (recommended):
  git checkout -b add-readme
  # create README.md and paste this content
  git add README.md
  git commit -m "Add project README"
  git push -u origin add-readme
  # open a Pull Request on GitHub
- Or commit directly to main if you prefer:
  git checkout main
  # add README.md
  git add README.md
  git commit -m "Add README"
  git push origin main

If you'd like, I can:
- Suggest a small code cleanup patch for script.js to remove setTimeout and handle the generated element more robustly (I can provide a patch you can apply),
- Draft a minimal CONTRIBUTING.md,
- Draft a simple GitHub Actions workflow to deploy the site to GitHub Pages automatically.

Tell me which of the above you'd like next (README commit, code cleanup patch, deploy workflow, or CONTRIBUTING.md) and I will prepare the file content you can paste/commit.  
