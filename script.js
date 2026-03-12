const services = [
  { id: 1, name: "Wash and Fold", price: 249 },
  { id: 2, name: "Dry Cleaning", price: 399 },
  { id: 3, name: "Steam Iron", price: 149 },
  { id: 4, name: "Express Service", price: 549 },
  { id: 5, name: "Shoe Cleaning", price: 299 },
  { id: 6, name: "Delicate Wash", price: 329 },
  { id: 7, name: "Bedding Service", price: 449 },
  { id: 8, name: "Curtain Cleaning", price: 499 },
  { id: 9, name: "Carpet Cleaning", price: 799 },
  { id: 10, name: "Stain Removal", price: 199 },
  { id: 11, name: "Ironing Service", price: 179 },
  { id: 12, name: "Blanket Wash", price: 389 },
  { id: 13, name: "Office Wear Care", price: 359 },
  { id: 14, name: "Kids Wear Wash", price: 229 },
  { id: 15, name: "Wedding Dress Cleaning", price: 999 },
];

const emailConfig = {
  publicKey: "wcVWJLA26qY4M_AFh",
  serviceId: "service_k25qsay",
  bookingTemplateId: "template_7b8cv16",
  newsletterTemplateId: "template_623w3b8",
  ownerEmail: "quickwashcompany001@gmail.com",
};

let cart = [];
let emailStarted = false;

const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const bookingForm = document.getElementById("bookingForm");
const newsletterForm = document.getElementById("newsletterForm");
const bookingMessage = document.getElementById("bookingMessage");
const newsletterMessage = document.getElementById("newsletterMessage");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const heroBookBtn = document.getElementById("heroBookBtn");
const bookBtn = document.getElementById("bookBtn");
const newsletterBtn = document.getElementById("newsletterBtn");

function money(amount) {
  return "Rs. " + amount;
}

function makeServiceCard(service) {
  const card = document.createElement("div");
  card.className = "service-card";

  const title = document.createElement("h3");
  title.textContent = service.name;

  const price = document.createElement("p");
  price.textContent = "Price: " + money(service.price);

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "small-btn add-btn";
  addButton.textContent = "Add";
  addButton.dataset.action = "add";
  addButton.dataset.id = service.id;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "small-btn remove-btn";
  removeButton.textContent = "Remove";
  removeButton.dataset.action = "remove";
  removeButton.dataset.id = service.id;

  buttonRow.appendChild(addButton);
  buttonRow.appendChild(removeButton);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(buttonRow);

  return card;
}

function showServices() {
  serviceList.textContent = "";

  for (let i = 0; i < services.length; i++) {
    serviceList.appendChild(makeServiceCard(services[i]));
  }
}

function addItem(id) {
  let item = null;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      item = cart[i];
      break;
    }
  }

  if (item) {
    item.qty = item.qty + 1;
  } else {
    for (let i = 0; i < services.length; i++) {
      if (services[i].id === id) {
        cart.push({
          id: services[i].id,
          name: services[i].name,
          price: services[i].price,
          qty: 1,
        });
      }
    }
  }

  showCart();
}

function removeItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty = cart[i].qty - 1;

      if (cart[i].qty === 0) {
        cart.splice(i, 1);
      }

      break;
    }
  }

  showCart();
}

function totalAmount() {
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].qty;
  }

  return total;
}

function orderText() {
  let text = "";

  for (let i = 0; i < cart.length; i++) {
    const oneLine = cart[i].name + " x" + cart[i].qty + " - " + money(cart[i].price * cart[i].qty);

    if (text === "") {
      text = oneLine;
    } else {
      text = text + ", " + oneLine;
    }
  }

  return text;
}

function makeCartEntry(item) {
  const row = document.createElement("div");
  row.className = "cart-entry";

  const left = document.createElement("div");
  const title = document.createElement("h4");
  const qty = document.createElement("p");
  title.textContent = item.name;
  qty.textContent = "Qty: " + item.qty;

  const price = document.createElement("strong");
  price.textContent = money(item.price * item.qty);

  left.appendChild(title);
  left.appendChild(qty);
  row.appendChild(left);
  row.appendChild(price);

  return row;
}

function showCart() {
  cartItems.textContent = "";

  if (cart.length === 0) {
    const emptyText = document.createElement("p");
    emptyText.className = "empty-text";
    emptyText.textContent = "No services added yet.";
    cartItems.appendChild(emptyText);
    cartCount.textContent = "0 items";
    cartTotal.textContent = money(0);
    return;
  }

  let itemCount = 0;

  for (let i = 0; i < cart.length; i++) {
    itemCount = itemCount + cart[i].qty;
    cartItems.appendChild(makeCartEntry(cart[i]));
  }

  cartCount.textContent = itemCount + " items";
  cartTotal.textContent = money(totalAmount());
}

function clearBookingErrors() {
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  bookingMessage.textContent = "";
}

function bookingValid() {
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  let valid = true;

  clearBookingErrors();

  if (cart.length === 0) {
    bookingMessage.textContent = "Please add at least one service.";
    valid = false;
  }

  if (name.length < 3) {
    document.getElementById("nameError").textContent = "Please enter your full name.";
    valid = false;
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    document.getElementById("emailError").textContent = "Please enter a valid email.";
    valid = false;
  }

  if (/^\d{10}$/.test(phone) === false) {
    document.getElementById("phoneError").textContent = "Please enter a 10 digit phone number.";
    valid = false;
  }

  return valid;
}

function newsletterValid(name, email) {
  if (name.length < 3) {
    newsletterMessage.textContent = "Please enter your full name.";
    return false;
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    newsletterMessage.textContent = "Please enter a valid email.";
    return false;
  }

  return true;
}

function emailReady() {
  if (window.emailjs === undefined) {
    return false;
  }

  if (
    emailConfig.publicKey === "YOUR_PUBLIC_KEY" ||
    emailConfig.serviceId === "YOUR_SERVICE_ID" ||
    emailConfig.bookingTemplateId === "YOUR_BOOKING_TEMPLATE_ID" ||
    emailConfig.newsletterTemplateId === "YOUR_NEWSLETTER_TEMPLATE_ID"
  ) {
    return false;
  }

  if (emailStarted === false) {
    window.emailjs.init({ publicKey: emailConfig.publicKey });
    emailStarted = true;
  }

  return true;
}

async function sendBooking(data) {
  // I used async/await here because it reads top to bottom like normal steps.
  // First the email service is checked, then the mails are sent, then the form shows a result.
  if (emailReady() === false) {
    throw new Error("EmailJS is not configured yet.");
  }

  const mailData = {
    customer_name: data.name,
    customer_email: data.email,
    customer_phone: data.phone,
    order_summary: orderText(),
    total_amount: money(totalAmount()),
  };

  await window.emailjs.send(emailConfig.serviceId, emailConfig.bookingTemplateId, {
    to_email: data.email,
    ...mailData,
  });

  await window.emailjs.send(emailConfig.serviceId, emailConfig.bookingTemplateId, {
    to_email: emailConfig.ownerEmail,
    ...mailData,
  });
}

async function sendNewsletter(data) {
  // This function is similar to booking, but it sends only newsletter details.
  if (emailReady() === false) {
    throw new Error("EmailJS is not configured yet.");
  }

  const mailData = {
    customer_name: data.name,
    customer_email: data.email,
    customer_phone: "Not provided",
    order_summary: "Newsletter subscription",
    total_amount: "Rs. 0",
  };

  await window.emailjs.send(emailConfig.serviceId, emailConfig.newsletterTemplateId, {
    to_email: data.email,
    ...mailData,
  });

  await window.emailjs.send(emailConfig.serviceId, emailConfig.newsletterTemplateId, {
    to_email: emailConfig.ownerEmail,
    ...mailData,
  });
}

serviceList.addEventListener("click", function (event) {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);

  if (button.dataset.action === "add") {
    addItem(id);
  }

  if (button.dataset.action === "remove") {
    removeItem(id);
  }
});

bookingForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (bookingValid() === false) {
    return;
  }

  const data = {
    name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
  };

  bookBtn.disabled = true;
  bookBtn.textContent = "Booking...";

  try {
    await sendBooking(data);
    bookingMessage.textContent = "Booking confirmed and email sent successfully.";
    bookingForm.reset();
    cart = [];
    showCart();
  } catch (error) {
    bookingMessage.textContent = "Booking saved, but EmailJS is not set up or email sending failed.";
  }

  bookBtn.disabled = false;
  bookBtn.textContent = "Book Now";
});

newsletterForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("newsletterName").value.trim();
  const email = document.getElementById("newsletterEmail").value.trim();

  newsletterMessage.textContent = "";

  if (newsletterValid(name, email) === false) {
    return;
  }

  newsletterBtn.disabled = true;
  newsletterBtn.textContent = "Sending...";

  try {
    await sendNewsletter({ name: name, email: email });
    newsletterMessage.textContent = "Subscription successful and email sent.";
    newsletterForm.reset();
  } catch (error) {
    newsletterMessage.textContent = "Subscription saved, but EmailJS is not set up or email sending failed.";
  }

  newsletterBtn.disabled = false;
  newsletterBtn.textContent = "Subscribe";
});

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});

const navItems = navLinks.querySelectorAll("a");

for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", function () {
    navLinks.classList.remove("show");
  });
}

heroBookBtn.addEventListener("click", function () {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
});

showServices();
showCart();
