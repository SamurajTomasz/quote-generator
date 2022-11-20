const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-button');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function getNewQuote(data){
    loading();
    let quote = data[Math.floor(Math.random() * data.length)];
    
    if(!quote.author) {
        quoteAuthor.textContent = "Unknown";
    } else {
        quoteAuthor.textContent = quote.author;
    }

    if(quote.text.length > 90){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

async function loadQuote(){
    loading();
    const urlToFetch = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const data = await fetch(urlToFetch);
        let response = await data.json();
        getNewQuote(response);
    } catch(error) {
        console.log(error)
    }
}

function loadTwitter(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}


twitterBtn.addEventListener('click', loadTwitter);
newQuote.addEventListener('click', loadQuote);


loadQuote();