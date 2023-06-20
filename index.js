//This is a little JS program I wrote for myself to calculate profit and margins on different platforms for my side hustle.

// 0.27	Listing fee
// 6.50%	Transaction fee
// 3%-4%	Payment processing
// 0.25	Payment processing
// Small plastic mailers	0.07
// Large plastic mailers	0.18
// Catalogue envelopes	0.3
// Oversized letter mail in Canada: $1.94, $3.19, $4.44, $5.09, $5.47

let shippingSupplyCost;
let shippingRevenue;
const productCost = 1.01;

function marginFunc(price, quantity, location, platform) {

  if (location === 'Canada') {
    shippingRevenue = 0;
    if (quantity <= 3) {
      shippingSupplyCost = 0.72 + 1.94;
    };
    if (quantity > 3 && quantity <= 6) {
      shippingSupplyCost = 0.93 + 3.19;
    };
    if (quantity > 6) {
      shippingSupplyCost = 1.13 + 3.19;
    };
  }

  if (location === 'USA') {
    shippingRevenue = 5;
    if (quantity <= 3) {
      shippingSupplyCost = 0.72 + 8.34;
    };
    if (quantity > 3 && quantity <= 6) {
      shippingSupplyCost = 0.93 + 8.34;
    };
    if (quantity > 6) {
      shippingSupplyCost = 1.13 + 10.19;
    };
  }
  
  if (platform === "Etsy") {
    etsyMargin(price, quantity, location);
  };

  if (platform === "Shopify") {
    shopifyOnlineMargin(price, quantity, location);
  };

  if (platform === "In person") {
    shippingSupplyCost = 0.07;
    shopifyInPersonMargin(price, quantity);
  }
}


function etsyMargin(price, quantity, location) {
  const fixedCost = 0.52 + shippingSupplyCost;
  const variableCost = 0.105;
  const revenue = price * quantity;
  let profit = (revenue + shippingRevenue - fixedCost - (revenue * variableCost) - (productCost * quantity)).toFixed(2);
  let margin = (profit / revenue * 100).toFixed(2);
  return(console.log(`For ${quantity} items purchased from Etsy in ${location}, profit is $${profit} and margin is ${margin}%`))
};

function shopifyOnlineMargin(price, quantity, location) {
  const fixedCost = 0.3 + shippingSupplyCost;
  const variableCost = 0.029;
  const revenue = price * quantity;
  let profit = (revenue + shippingRevenue - fixedCost - (revenue * variableCost) - (productCost * quantity)).toFixed(2);
  let margin = (profit / revenue * 100).toFixed(2);
  return(console.log(`For ${quantity} items purchased from Shopify in ${location}, profit is $${profit} and margin is ${margin}%`))
};

function shopifyInPersonMargin(price, quantity) {
  const fixedCost = 0.3 + shippingSupplyCost;
  const variableCost = 0.027;
  const revenue = price * quantity;
  let profit = (revenue - fixedCost - (revenue * variableCost) - (productCost * quantity)).toFixed(2);
  let margin = (profit / revenue * 100).toFixed(2);
  return(console.log(`For ${quantity} items purchased in person, profit is $${profit} and margin is ${margin}%`))
};

marginFunc(12, 4, "Canada", "Etsy")
marginFunc(12, 1, "USA", "Shopify")
marginFunc(12, 1, "USA", "Etsy")
marginFunc(12, 1, "Canada", "In person")