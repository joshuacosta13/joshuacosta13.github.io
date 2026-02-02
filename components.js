// Loads the header part of the website
fetch('header.html') // tan awon niya if naa diay header.html file
  .then(response => response.text()) // if naa, then pasabot ana naay response, so i-convert niya ang response into text form
  .then(data => { 
    document.getElementById('header').innerHTML = data;
  })
  .catch(error => console.error('Error loading header:', error));

// Loads the footer part of the website
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));

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
        averageRating: `Loading...`,
        ratingCount: 0,
        seller: "12d - Group 2",
        img: "assets/bananacue.jpg"
    },
    "gulaman": {
        name: "Gulaman",
        description: "Refreshing jelly drink made from agar-agar, perfect for cooling down on a hot day.",
        averageRating: `Loading...`,
        ratingCount: 5,
        seller: "12a - Group 2",
        img: "assets/gulaman.png"
    },
    "graham-balls": {
        name: "Graham Balls",
        description: "Sweet and crunchy graham cracker balls filled with chocolate and condensed milk.",
        averageRating: `Loading...`,
        ratingCount: 0,
        seller: "12b - Group 3",
        img: "assets/graham-balls.jpg"
    },
    "churrolicious": {
        name: "Churrolicious",
        description: "Crispy and golden churros coated with sugar and dipped in chocolate sauce.",
        averageRating: `Loading...`,
        ratingCount: 5,
        seller: "ICT12a - Gallantry (Group 1)",
        img: "assets/churrolicious.jpg"
    }, 
    "ice-candy": {
      name: "Ice Candy", 
      description: "Cold and sweet for a hot, sunny day! ", 
      averageRating: `Loading...`, 
      ratingCount: 0,
      seller: "12a - Group 3", 
      img: " assets/ice-candy.png"
    }, 
    "banana-chips": {
      name: "Banana Chips", 
      description: "Bite-sized crunch for a quick snack! ", 
      averageRating: `Loading...`, 
      ratingCount: 0,
      seller: "12e - Group 2", 
      img: " assets/Healthy-Baked-Banana-Chips.jpg"
    }, 
    "cookies": {
      name: "Cookies", 
      description: "Baked with the taste of home and warmth.", 
      averageRating: `Loading...`, 
      ratingCount: 0,
      seller: "12c - Group 3", 
      img: "assets/cookies.png"
    }
};
// Setup Google Sheets CSV URLS for each product form
const productSheetURLs = {
  "banana-cue": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQu1X0oGEwr9u9MOo4MdlUjFSo8hhahPPr0Of0aU289X0B8STlmDjoDI0dk87i6Ru0A80qspWOmRicx/pub?output=csv",
  "gulaman": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXLxtV_6nU7Vx8B_A0t6kidvkLlzsIpFje2fFqmnDcIsMuzaOQ0P_qr-hyOvx6LVzO6BVGKM-DN-NO/pub?output=csv", 
  "churrolicious": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbVnDUdc0MRhXKxmoKK09nY7ujxHTJEYUi10MzKsT1i3OoGR3-BVH0McSnOxyGolG9l-DePpnd2CfR/pub?output=csv"
}

// set up product forms
const productForms = {
    "banana-cue": "https://docs.google.com/forms/d/e/1FAIpQLSctlUR3m5yNUd5eUYk7GmTEercr1lqevTKhcDVDRMaiLq92AA/viewform?embedded=true",
    "gulaman": "https://docs.google.com/forms/d/e/1FAIpQLSdPPJggdY7cTkm19GE72BolEtkm2t3LFmSex0CVpiThG_ukdg/viewform?embedded=true",
    "churrolicious": "https://docs.google.com/forms/d/e/1FAIpQLSdlyguvB3lDN_Y1GG_05OulB4FxpgynV_Hsn7Xp1aiCUCz6QA/viewform?embedded=true"
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
  // document.getElementById("product-count").textContent = product.ratingCount;
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
    const productName = document.getElementById("product-name");
    const productDescription = document.getElementById("product-description");
    if (productName && productDescription) {
    document.getElementById("product-name").textContent = `unknown product`;
    document.getElementById("product-description").textContent = `unknown product`; 
  }
  }

// needed a lot of comments for this so i dont forget how it works lol  
// Fetch ratings from a single product's sheet 
async function fetchRatings(sheetURL) { // function to fetch ratings from a Google Sheets CSV URL
  try { // try means to attempt the code inside it, while catch means to handle any errors that may occur
    const response = await fetch(sheetURL); // fetch the CSV data from the provided URL
    const csv = await response.text(); // and then convert the response to text format
    console.log("CSV data fetched successfully.");

    // Split into rows and skip header
    const rows = csv.split('\n').slice(1); 

    const ratings = []; // array to store the ratings

    rows.forEach(row => { // loop through each row
      if (!row.trim()) return; // Skip empty rows

      const columns = row.split(','); // split the row into columns, the comma is the delimiter, a delimiter is a character that separates values in a data file
      const rating = parseFloat(columns[1]); // Assuming rating is in the second column (index 1) parseFloat converts a string to a floating-point number because ratings can be decimal numbers
      // next step is to check if the rating is a valid number before adding it to the ratings array
      if (!isNaN(rating)) { // if rating is a valid number
        ratings.push(rating); // add to ratings array 
      }
    }); // end of rows.forEach

    // Calculate average rating
    if (ratings.length > 0) {
      const sum = ratings.reduce((a, b) => a + b, 0); // reduce method sums up all ratings in the array by iterating through each rating and adding it to the accumulator b, starting from 0
      const average = sum / ratings.length; // calculate average by dividing sum by number of ratings
      console.log(`Average rating: ${average.toFixed(2)}`); // log average rating, toFixed(2) limits to 2 decimal places
      return {
        average: average, // return average rating, why is it in an object? because we also want to return the count of ratings
        count: ratings.length // return count of ratings
      };
    } // end of if ratings.length > 0

    return null; // return null if no ratings found


      } catch (error) {
        console.error("Error fetching ratings: :(", error);
        return null; // return null in case of error
  }
}

// Next, convert numeric rating to stars
function getStars(rating) {
  const fullStars = Math.floor(rating); // get the integer part of the rating, how Math.floor works: it rounds down to the nearest integer
  const hasHalfStar = (rating % 1) >= 0.5; // check if there's a half star, how this works: rating % 1 gives the decimal part, if it's 0.5 or more, we have a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // calculate empty stars, total stars are 5, so subtract full stars and half star if present, the ?: is a ternary operator, it works like an if-else statement in a single line
  // build the star string
  return '★'.repeat(fullStars) + // what does repeat do: it creates a new string by repeating the original string a specified number of times
          (hasHalfStar ? '⯨' : '') + // another ternary operator to add half star if present
          '☆'.repeat(emptyStars); // add empty stars if any
}

// Finally, update the rating display on the page
async function updateAllRatings() {
  // Fetch all ratings in parallel for better performance
  const ratingPromises = Object.entries(productSheetURLs).map(([productId, sheetURL]) => {
    if (!sheetURL || !products[productId]) {
      return Promise.resolve();
    }
    
    return fetchRatings(sheetURL).then(ratingData => {
      if (ratingData) {
        const averageStars = ratingData.average.toFixed(1);
        const starText = getStars(ratingData.average);
        products[productId].averageRating = `${averageStars} ${starText}`;
        products[productId].ratingValue = averageStars;
        products[productId].ratingStars = starText;
        products[productId].ratingCount = ratingData.count;
      }
    });
  });

  // Wait for all ratings to be fetched
  await Promise.all(ratingPromises);

  // Update ratings on the homepage cards
  document.querySelectorAll('.card[data-product]').forEach(card => {
    const productId = card.dataset.product;
    const ratingElement = card.querySelector('.rating');

    if (!ratingElement) return;

    const productData = products[productId];
    const hasSheet = !!productSheetURLs[productId];

    if (productData && productData.ratingValue && productData.ratingStars) {
      ratingElement.innerHTML = `<span class="rating-number">${productData.ratingValue}</span> <span class="rating-stars">${productData.ratingStars}</span>`;
    } else if (!hasSheet) {
      ratingElement.textContent = "Rating coming soon";
    } else {
      ratingElement.textContent = "Loading...";
    }
  });

  // If we're on a product detail page, update that product's rating display
  if (productName && products[productName]) { // but ive been using [productId] before, why productName here? because productName is the specific product we're viewing on the detail page. Wait, are you sure about that? Yes, productName is obtained from the URL parameter, so it represents the current product being viewed.
    const ratingElement = document.getElementById("product-rating"); // get the rating element on the page
    if (ratingElement) { // if the element exists
      const ratingValue = products[productName].ratingValue;
      const ratingStars = products[productName].ratingStars;

      if (ratingValue && ratingStars) {
        ratingElement.innerHTML = `<span class="rating-number">${ratingValue}</span> <span class="rating-stars">${ratingStars}</span>`;
      } else {
        ratingElement.textContent = products[productName].averageRating;
      }

      // Optionally, update the rating count display if you have an element for it
      if (products[productName].ratingCount) {
        ratingElement.innerHTML += ` <span class="rating-count">(${products[productName].ratingCount} reviews)</span>`; // append the count of ratings
      }
    }
  }
}

// Call the function to update all ratings on page load
updateAllRatings().catch(error => console.error('Error updating ratings:', error));




  // popup modal functions
  function openModal() {
    document.getElementById("scanModal").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("scanModal").style.display = "none";
  }
