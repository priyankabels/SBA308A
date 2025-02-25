// favorites.js

// Get the favorites list from localStorage
export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Add a character to the favorites list
export function addToFavorites(character)
{
    //localStorage.clear();
   console.log("Addto Fav called",character)
   const favoriteButton = document.getElementById("addToFavButton");
    let favorites = getFavorites();
    const FavBtn=document.getElementById("addToFavButton");
    // Check if the character is already in the favorites
    const isFavorite = favorites.some(fav => fav._id === character._id);

    console.log("IsFav",isFavorite)
    if(isFavorite)
    {
        // Remove character from favorites list if it already exists
        favorites = favorites.filter(fav => fav._id !== character._id);
        localStorage.setItem('favorites', JSON.stringify(favorites));  // Update localStorage
        alert(`${character.name} has been removed from your favorites!`);
        FavBtn.classList.remove("favorite");
        
        favoriteButton.innerHTML = '<i class="fa-regular fa-star fa-lg"></i> Mark as Favorite';
        console.log(FavBtn.classList)
    }
    else
    {
        favorites.push(character);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${character.name} has been added to your favorites!`);
        FavBtn.classList.add("favorite");
        favoriteButton.innerHTML = '<i class="fa-solid fa-star fa-lg"></i> Remove from Favorites';
        
        console.log(FavBtn.classList)
    }
   
}
//To handle initial load
export function toggleFavoriteButtonState(isFavorite) {
    console.log("Inside toggle");
    const favoriteButton = document.getElementById("addToFavButton");
    
    if (isFavorite) {
        // Change the button to indicate it's a favorite (e.g., filled star)
        favoriteButton.innerHTML = '<i class="fa-solid fa-star fa-lg"></i> Remove from Favorites';
    } else {
        // Change the button to indicate it's not a favorite (e.g., empty star)
        favoriteButton.innerHTML = '<i class="fa-regular fa-star fa-lg"></i> Mark as Favorite';
    }
}