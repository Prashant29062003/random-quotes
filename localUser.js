import localData from "./userData.js"

const quoteData = [...localData]

let quoteBox = document.getElementById('quote-box');
let quoteText = document.getElementById('quote-text');
let authorName = document.getElementById('author');
let newQuoteBtn = document.getElementById('new-quote');
let loader = document.getElementById('loader');



function showLoadingSpinner(){
    loader.hidden = false;
    quoteBox.hdden = true
}
function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteBox.hidden = false;
    }
}

// Get Data Randomly
function getQuotes(){
    showLoadingSpinner();
    // Random data
    const data = quoteData[Math.floor(Math.random() * quoteData.length)];

    // display data
    // console.log(data);
    quoteText.innerHTML = data.quote;
    if(!data.name.title || !data.name.first || !data.name.last){
        authorName.innerHTML = `Unknown`
    }else{
        authorName.innerHTML = `${data.name.title} ${data.name.first} ${data.name.last}`
    }

    // Styling Change According to length of quote
    if(data.quote.length > 120){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }
    removeLoadingSpinner()
}


// get Quote
getQuotes();

// Event Listner
newQuoteBtn.addEventListener("click", getQuotes)