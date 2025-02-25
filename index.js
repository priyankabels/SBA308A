import * as Favorites from "./favorites.js"

const characterSelect = document.getElementById("characterSelect");
const charactersDisplay=document.getElementById("charactersDisplay");
const searchInput = document.getElementById("searchInput");
const getFavButton=document.getElementById("getFavouritesBtn");
const favoritesDisplay=document.getElementById("favoritesDisplay");



//adding baseUrl and headers API key as common 
axios.defaults.baseURL='https://api.disneyapi.dev/'

async function intialLoad()
{
    try
    {
        // const baseUrl = 'https://api.disneyapi.dev/';  // Base URL for the Disney API
        // Example endpoint to get Disney characters
        const endpoint = 'character';

        const response=await axios.get(`${endpoint}`, {
            headers: {
                    'Content-Type': 'application/json' // Set the content type to JSON (optional)
            // Add your API key here
            }
        })
       
        //Response object contains info and data object fetching data object
        let info=response.data.data
       

        //Fill the drop down with the character list 
        info.forEach((i) => {
            const option=document.createElement("option");
            option.value=i._id;
            option.textContent=i.name;
            characterSelect.appendChild(option)
        });
        getCharacterInformation();
    }
    catch(err)
    {
        console.log(err);
    }

}
intialLoad()
characterSelect.addEventListener("change",getCharacterInformation)


async function getCharacterInformation()
{
try
    {
        //Erasing favoritesDisplay section
        favoritesDisplay.innerHTML="";
  //selected index to get character info from API
    const index = characterSelect.value;
    console.log(index)

 // Get the text content of the selected option
    
   // const baseUrl = 'https://api.disneyapi.dev/';  // Base URL for the Disney API

    // Example endpoint to get Disney characters
    const endpoint = "character/";

    const response=await axios.get(`${endpoint}${index}`, {
        headers: {
                'Content-Type': 'application/json' // Set the content type to JSON (optional)
        // Add your API key here
        }}
    );

     let info=response.data.data
    console.log("info",info)

//const characterfind=info.find(i=> {i.name.toLowerCase()===selectedText.toLowerCase()});

charactersDisplay.innerHTML="";

const frag=document.createDocumentFragment(); //Using Document fragment for better performance
const newcharDiv=document.createElement("div");
//const p=document.createElement("p");
// const img=document.createElement("img");
// img.src=info.imageUrl;
// newcharDiv.appendChild(img)
newcharDiv.innerHTML=`
<h2>${info.name}</h2>
<img src=${info.imageUrl} alt="Character Image" class="character-image"/>
 <p><strong>Films:</strong> ${info.films && info.films.length>0 ? info.films : 'None Available'}</p>
<p><strong>Short Films:</strong> ${info.shortFilms && info.shortFilms.length>0 ? info.shortFilms : 'None Available'}</p>
<p><strong>TV Shows:</strong> ${info.tvShows && info.tvShows.length>0 ? info.tvShows : 'None Available'}</p>
<p><strong>Video Games:</strong> ${info.videoGames && info.videoGames.length>0 ? info.videoGames : 'None Available'}</p>
<a href="${info.sourceUrl} target="_blank""><strong>Source:</strong>${info.sourceUrl}</a>
<p><strong>Enemies:</strong> ${info.enemies && info.enemies.length>0 ? info.enemies : 'None'}</p>
<p><strong>Park Attractions:</strong> ${info.parkAttractions && info.parkAttractions.length>0 ? info.parkAttractions : 'None Available'}</p>
<p><strong>Created At:</strong> ${info.createdAt? info.createdAt :'None'}</p>
<p><strong>Updated At:</strong> ${info.updatedAt? info.updatedAt :'None'}</p>
<button type="submit" id="addToFavButton"><i class="fa-solid fa-star fa-lg"></i></button>
`

frag.appendChild(newcharDiv);
charactersDisplay.appendChild(frag);
//console.log(info.imageUrl)
//img.alt="CHaracter image"
//charactersDisplay.appendChild(img)
 // Attach event listener to the "Mark as Favorite" button
 document.getElementById("addToFavButton").addEventListener("click", function() {
    Favorites.addToFavorites(info);  // Pass the character info to the addToFavorites function
});
  
 // Toggle the button state (show if it's already a favorite or not)
 //const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
 const favorites=Favorites.getFavorites();

 const isFavorite = favorites.some(fav => fav._id === info._id);
 Favorites.toggleFavoriteButtonState(isFavorite);
}
catch(err)
{
    console.log("Error getting charcter details",err);
   
}
      
}


  // Function to fetch data from the API with search term
 async function fetchCharacters(query) {
    // Construct the API URL with the search query as a parameter
   
    const response=await axios.get("/character",{
        params:{
           "name":query,
           "page":1
        }
    })
      
      const data=response.data.data;
      const searchDisplay=document.getElementById("searchDisplay");
       // Clear previous search results
       searchDisplay.innerHTML = '';
       let strInfo="";

      data.forEach(info=>
      {
        let strInfo=`<table>`;
        
         strInfo+=`<tr><td><b>${info.name}</b></td></tr>`
         strInfo+=`<tr><td><img src=${info.imageUrl} alt="img" width=30% height=30%/><td/><tr/>`
         strInfo+=`<tr><td><a href=${info.sourceUrl}>Read More</a><td/><tr/>`
         strInfo+=`</table>`
         searchDisplay.innerHTML+=strInfo

      });
  }

  searchInput.addEventListener("input", function(event) {
    const query = event.target.value.toLowerCase().trim();

    if (query) {
      // Fetch characters based on the query
      fetchCharacters(query);
    } else {
      // If search input is empty, reset the list (or you could load all characters again)
   // If search input is empty, reset the list (optional: you can display a message or clear results)
     document.getElementById("searchDisplay").innerHTML = '';

    }
  });

getFavButton.addEventListener("click",displayFavorites)

function displayFavorites()
{
    charactersDisplay.innerHTML="";
    const favorites=Favorites.getFavorites();
    if(favorites && favorites.length>0)
    {//Write logic to grab fromm local storage and display
        console.log(favorites);
        renderFavorites(favorites)
        

    }
    else
    {
        const p=document.createElement("p");
        p.textContent="No Favorites to Display";
        favoritesDisplay.appendChild(p)
        
    }

}

function renderFavorites(favorites){
    try
    {
        if(favorites)
        {
        favorites.forEach((info)=>
            {
                const frag=document.createDocumentFragment(); //Using Document fragment for better performance
                const newcharDiv=document.createElement("div");
                newcharDiv.innerHTML=`
                <h2>${info.name}</h2>
                <img src=${info.imageUrl} alt="Character Image"/>
                <p><strong>Films:</strong> ${info.films && info.films.length>0 ? info.films : 'None Available'}</p>
                <p><strong>Short Films:</strong> ${info.shortFilms && info.shortFilms.length>0 ? info.shortFilms : 'None Available'}</p>
                <p><strong>TV Shows:</strong> ${info.tvShows && info.tvShows.length>0 ? info.tvShows : 'None Available'}</p>
                <p><strong>Video Games:</strong> ${info.videoGames && info.videoGames.length>0 ? info.videoGames : 'None Available'}</p>
                <a href="${info.sourceUrl} target="_blank""><strong>Source:</strong>${info.sourceUrl}</a>
                <p><strong>Enemies:</strong> ${info.enemies && info.enemies.length>0 ? info.enemies : 'None'}</p>
                <p><strong>Park Attractions:</strong> ${info.parkAttractions && info.parkAttractions.length>0 ? info.parkAttractions : 'None Available'}</p>
                <p><strong>Created At:</strong> ${info.createdAt? info.createdAt :'None'}</p>
                <p><strong>Updated At:</strong> ${info.updatedAt? info.updatedAt :'None'}</p>
                `

                frag.appendChild(newcharDiv);
                charactersDisplay.appendChild(frag);
            });
        }
    }
    catch(err)
    {
        console.log("Error rendering favorites",err)
    }
}