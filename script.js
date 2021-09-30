

//declare constants for dynamic elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const linkedinBtn = document.getElementById('linkedin');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;

}

// Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
  
    }
}

let apiQuotes =[];
// Show new quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    authorText.innerText = quote.author ? quote.author : "unknown";
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    // Set quote and hide loader
    quoteText.innerText = quote.text;
    removeLoadingSpinner();
  }
  
  // Get quotes from API
  async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = "https://type.fit/api/quotes";
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
      // Catch error here
    }
  }

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function facebookQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const title = "Quote Generator";
  const personalLink = "https://hema8codes.github.io/Quote-generator/";
  const facebookUrl = `http://www.facebook.com/sharer.php?s=100&p[title]=${title}&p[url]=${encodeURIComponent(
    personalLink)}&p[quote]=${quote} ~${author}`;
  window.open(facebookUrl, '_blank');
}

function linkedinQoute(){
    const personalLink = "https://hema8codes.github.io/Quote-generator/";
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    personalLink
  )}`;
    window.open(linkedinUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', facebookQuote);
linkedinBtn.addEventListener('click',linkedinQoute);

// On Load
getQuotes();




