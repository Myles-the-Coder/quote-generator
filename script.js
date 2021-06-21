"use strict";

const quoteContainer = document.getElementById('quote-container')
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");
const proxyUrl = "https://whispering-river-03085.herokuapp.com/";

//Get JSON data
async function getJSON(url) {
  loadSpinner()
  try {
    const res = await fetch(proxyUrl + url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// getJSON('api.quotable.io/random')

//Add quote and author to DOM
async function addQuote() {
  const data = await getJSON("api.quotable.io/random");

  if (data.content.length < 75) {
    quote.style.fontSize = "3rem";
  }

  quote.innerHTML = `
<img src="https://img.icons8.com/ios-filled/50/000000/quote-left.png"/>
${data.content}
`;
  author.innerHTML = `
  - ${data.author}
`;
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} ${author.textContent}`;
  window.open(twitterUrl, '_blank')
}

//Load Spinner
function loadSpinner() {
    quote.innerHTML = `
    <img src="./img/Rolling-1s-506px.svg" alt="Loading...">
    `
}

//Hide spinner
function hideSpinner() {

}

//On Load
addQuote()
quoteBtn.addEventListener("click", addQuote);
twitterBtn.addEventListener("click", tweetQuote);
