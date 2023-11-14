const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
//// const spinner = document.querySelector(".loader");
let apiQuotes = [];
//Show Loading spinner
const showLoadingSpinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//Hide loading spinner
const hideLoadingSpinner = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};
//Show new Quote
const newQuote = function () {
  // // Show Loading Spinner
  // quoteContainer.classList.add("hidden");
  // spinner.classList.remove("hidden");
  //Pick a random quote from apiQuotes Array
  //show loading spinner
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if Author field is blank and replace with it Unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //check Quote length is greater than 120 if yes than resize the text
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loading spinner
  quoteText.textContent = quote.text;
  hideLoadingSpinner();

  // // Hide Loading Spinner
  // spinner.classList.add("hidden");
  // quoteContainer.classList.remove("hidden");
};
// Get Quotes From API
const getQuotes = async function () {
  // // Show Loading Spinner
  // quoteContainer.classList.add("hidden");
  // spinner.classList.remove("hidden");
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    // // Hide Loading Spinner
    // spinner.classList.add("hidden");
    // quoteContainer.classList.remove("hidden");
  } catch (e) {
    console.log(e);
  }
};

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();
