import localData from "./userData.js"

let apiUserData = []
let userData = [...localData];
let quoteBox = document.querySelector("#quote-box");
let userPic = document.querySelector("#userPic img");
let authorName = document.querySelector("#author");
let quoteText = document.querySelector("#quote-text");
let twitterBtn = document.querySelector("#twitter");
let newQuoteBtn = document.querySelector("#new-quote");
let loader = document.querySelector("#loader");


// Show loading
function ShowLoadingSpinner(){
    loader.hidden = false;
    quoteBox.hidden = true;
}

// Hide loading
function removeLoadingSpinner(){
    if (!loader.hidden) {
        loader.hidden = true;
        quoteBox.hidden = false;
    }
}


// Show New Quote
function newUser(){
    
    ShowLoadingSpinner();

    // Get Quotes from userData randomly 
    const user = userData[Math.floor(Math.random() * userData.length)];

    // display data
    displayUser(user);
}


// API fetch using url 

async function getQuotes(){
        const apiUrl = "https://randomuser.me/api/";
    try {
        ShowLoadingSpinner();
        const response = await fetch(apiUrl);
        const user = await response.json();
        apiUserData = user.results[0];
        // console.log(apiUserData);
        
        // display user
        apiDisplayUser(apiUserData);

    } catch (error) {
        // Catch Error
        console.log(error);
    }
}

function apiDisplayUser(user){
    userPic.src = user.picture.large
    authorName.innerHTML = `${user.name.title} ${user.name.first} ${user.name.last}`
    quoteText.innerHTML = userData[Math.floor(Math.random() * userData.length)].quote;

    removeLoadingSpinner()
}
getQuotes()





function displayUser(userData){
    if(userData){
        quoteText.innerHTML = userData.quote;
        
        // Check if Author is known or not and according to this change Author;s name to "Unkown"
        if(!userData.name.title || !userData.name.first || !userData.name.last){
            authorName.innerHTML = "Unkown";
        }else{
            authorName.innerHTML = `${userData.name.title} ${userData.name.first} ${userData.name.last}`
        }
        
        // Check Quote length to determine Styling
        if(userData.quote.length > 120){
            quoteText.classList.add("long-quote");
        }else{
            quoteText.classList.remove("long-quote");
        }


        removeLoadingSpinner();
    }
}

// Linked In publish
function publishQuoteOnLinkedin(){
    const title = encodeURIComponent("Inspirational Quote");
    const summary = encodeURIComponent(`${quoteText.textContent} - ${authorName.textContent}`);
    const source = encodeURIComponent("https://www.linkedin.com/in/prashant-kumar-374290249/")

    // Link format - 
    // https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={summary}&source={source}

    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&title=${title}&summary=${summary}&source=${source}`;


    window.open(linkedinUrl, '_blank');
}

// Event Listner
// newQuoteBtn.addEventListener("click",newUser);
twitterBtn.addEventListener("click", publishQuoteOnLinkedin)

// for api
newQuoteBtn.addEventListener("click",getQuotes);

// on load
// getQuotes();

// new user
// newUser();
