# QuickWash Laundry Service

This is a simple laundry service website made with HTML, CSS, and JavaScript. I built it to practice arrays, cart logic, DOM updates, form validation, and EmailJS.

## Features

- 15 laundry services shown from a JavaScript array
- Add and remove services from the cart
- Booking form with basic validation
- Newsletter subscription form
- EmailJS support for booking and newsletter emails
- Responsive layout for mobile and desktop

## How to Run

1. Clone the project:
   `git clone <your-repository-link>`
2. Open the project folder:
   `cd "Latest laundry service"`
3. Run the project locally:
   Open `index.html` directly in the browser, or use a simple local server like VS Code Live Server.
4. Test the main features:
   Add services, check the cart total, submit the booking form, and test the newsletter form.

## EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/).
2. Create one email service in EmailJS.
3. Create two templates:
   one for booking confirmation and one for newsletter confirmation.
4. Open `script.js` and replace these placeholder values inside `emailConfig`:
   `YOUR_PUBLIC_KEY`
   `YOUR_SERVICE_ID`
   `YOUR_BOOKING_TEMPLATE_ID`
   `YOUR_NEWSLETTER_TEMPLATE_ID`
   `your-company-email@example.com`
5. Save the file and test both forms again.

Note:
Email sending will not work until real EmailJS values are added. I did not keep real credentials inside the project files for safety.

## Netlify Deployment

1. Create a Netlify account.
2. Click `Add new site` and choose `Deploy manually`.
3. Upload the project folder, or connect the Git repository.
4. After deployment, copy the live site URL.
5. Add that Netlify link here in this README before final submission.

Deployment link:
`Add your Netlify link here`

## What I Practiced

- Using arrays and loops to show services
- Using `addEventListener` instead of inline button handlers
- Updating the page with JavaScript using `textContent`
- Writing simple async/await code for EmailJS
- Making a basic responsive layout with CSS
