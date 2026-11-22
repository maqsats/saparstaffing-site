Sapar Staffing - saparstaffing.com
Static site (HTML/CSS/vanilla JS, no build step). Planned host: Netlify.

index.html       main page
privacy.html     privacy policy
thank-you.html   page shown after the form is sent
assets/site.css  all styles for the three pages (the logo is a base64 PNG at the end, used as a CSS mask)
assets/site.js   request form logic and the Copy buttons (index.html only)
img/             founder and work photos
favicon*, apple-touch-icon.png, icon-512.png, og-image.png - icons and link preview

Design: light theme only.
Direction "photo-led": the founder's real summer-job photos carry the page, hung on striped sea-glass awnings.
Colours: pine #123A2F (text, dark bands), sea glass #D5E8DE / #EEF5F1, leaf #93D0B0 (calendar peak), cranberry #A3263F (primary buttons and links only), white. All are variables at the top of site.css.
Font: Google Fonts - Parkinsans (one family for everything).
Photos are 600-720 px wide, so the layout never shows them much wider than ~400 CSS px.
og-image.png is a 1200x630 screenshot of ../og-image-source.html (kept outside this folder so it is not deployed).

Form: Netlify Forms (data-netlify="true", form-name "employer-request", honeypot field).
JS posts it via fetch only when hostname is saparstaffing.com or *.netlify.app, then redirects to thank-you.html.
On other hosts (local preview) it shows "Preview only" instead of sending.
Do not rename form fields: the name attributes are what Netlify records.
