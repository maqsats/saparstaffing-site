Sapar Staffing - saparstaffing.com
Static site (HTML/CSS/vanilla JS, no build step). Hosted on GitHub Pages: https://maqsats.github.io/saparstaffing-site/ (repo maqsats/saparstaffing-site, branch main, folder root).
Publish a change: commit and push to main; Pages rebuilds in about a minute.

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

Form: assets/site.js sends it to FormSubmit (https://formsubmit.co/ajax/saparali@saparstaffing.com), which emails
each request to that inbox as a table, with the employer's email as Reply-To, then the visitor sees thank-you.html.
FormSubmit needs a one-time confirmation: the first submission sends an "Activate Form" email to the inbox; click it.
It only sends on saparstaffing.com, maqsats.github.io and *.netlify.app; local previews show "Preview only".
The honeypot field company_website is checked in the script: if a bot fills it, nothing is sent.
The data-netlify attributes are kept so the same form also works with Netlify Forms if the site moves to Netlify.
Do not rename form fields: the name attributes become the rows of the email.
