// Loads the header part of the website
fetch('header.html') // tan awon niya if naa diay header.html file
  .then(response => response.text()) // if naa, then pasabot ana naay response, so i-convert niya ang response into text form
  .then(data => { 
    document.getElementById('header').innerHTML = data;
  });

// Loads the footer part of the website
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

// automatically wraps a card with an anchor tag if it has a data-link attribute
  document.querySelectorAll('.card[data-product]').forEach(card => {
    const productId = card.dataset.product;
    const link = document.createElement('a');
    link.href = `product-detail.html?product=${productId}`;
    link.className= 'card-link';

    card.parentNode.insertBefore(link, card);
    link.appendChild(card);
  });

  // SET UPS
// setup and define all product data in one place
const products = {
    "banana-cue": {
        name: "Banana Cue",
        description: "Delicious caramelized banana skewers, a popular Filipino street food snack.",
        averageRating: `4.5 ★★★★☆`,
        seller: "ABM 12a - Benevolence (Group 2)",
        img: "assets/bananacue.jpg"
    },
    "gulaman": {
        name: "Gulaman",
        description: "Refreshing jelly drink made from agar-agar, perfect for cooling down on a hot day.",
        averageRating: `4.2 ★★★★☆`,
        seller: "ABM 12a - Benevolence (Group 2)",
        img: "assets/gulaman.png"
    },
    "graham-balls": {
        name: "Graham Balls",
        description: "Sweet and crunchy graham cracker balls filled with chocolate and condensed milk.",
        averageRating: `4.0 ★★★★☆`,
        seller: "ABM 12b - Solidarity (Group 3)",
        img: "assets/graham-balls.jpg"
    },
    "churrolicious": {
        name: "Churrolicious",
        description: "Crispy and golden churros coated with sugar and dipped in chocolate sauce.",
        averageRating: `4.7 ★★★★★`,
        seller: "ICT12a - Gallantry (Group 1)",
        img: "assets/churrolicious.jpg"
    }
};

// set up product forms
const productForms = {
    "banana-cue": `"https://docs.google.com/forms/d/e/1FAIpQLSctlUR3m5yNUd5eUYk7GmTEercr1lqevTKhcDVDRMaiLq92AA/viewform"`,
    "gulaman": `"https://docs.google.com/forms/d/e/1FAIpQLSfasFEQ-vFZ-jv4FyRbUKL6q3LanEJIFwTlk4Q7T68RJ2oatA/viewform?usp=publish-editor"`,
    "churrolicious": `""`
}



// change page content based on product parameter in URL
// Get the product parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('product');

const product = products[productName];
// If a product parameter exists, load the corresponding content
if (product) {
  // Create content based on the product data
  console.log(`Loading content for product: ${product}`);
  document.getElementById("product-name").textContent = product.name;

  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-description").style.color = "#000000d1";

  document.getElementById("product-seller").textContent = product.seller;
  document.getElementById("product-rating").textContent = product.averageRating;
  document.getElementById("product-image").src = product.img;
  const formContainer = document.getElementById("product-form");
  if (formContainer) {
    const formURL = productForms[productName];
    if (formURL) {
      formContainer.innerHTML = `<div class="form-embed"><iframe src=${formURL}>Loading…</iframe></div>`;
     } else {
      formContainer.innerHTML = `<p>Order form is not available for this product.</p>`;
    }
  }

 // If no product parameter exists, load with an error message
 } else {
    console.log("No product parameter found in URL.");
    document.getElementById("product-name").textContent = `unknown product`;
    document.getElementById("product-description").textContent = `unknown product`;
  }


  // popup modal functions
  function openModal() {
    document.getElementById("scanModal").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("scanModal").style.display = "none";
  }