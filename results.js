document.addEventListener("DOMContentLoaded", () => {
    
    const container = document.getElementById("recipeContainer");
    const back = document.getElementById("btpBtn");

    back.addEventListener("click" , () => {
        window.location.href = "RecipeMaker.html";

    })
    // 1. Get ingredients from localStorage
    const stored = localStorage.getItem("ingredientsArray");
    if (!stored) {
        container.innerHTML = "<p>No ingredients found. Please go back and add some!</p>";
        return;
    }

    const ingredientArray = JSON.parse(stored);

 
    const apiKey = "a6b7b6b28db04f98b49075d2ff9e1dd4"; 
    const BASE = "https://api.spoonacular.com/recipes/findByIngredients";

    const ingredientString = encodeURIComponent(ingredientArray.join(","));
    const apiUrl = `${BASE}?ingredients=${ingredientString}&number=10&ranking=1&ignorePantry=true&apiKey=${apiKey}`;


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";

            if (data.length === 0) {
                container.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
                return;
            }

            
            data.forEach(recipe => {
                const card = document.createElement("div");
                card.classList.add("recipe-card");

                card.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}" style="max-width:200px; border-radius:8px;">
                    <h3>${recipe.title}</h3>
                    <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
                    <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            container.innerHTML = "<p>There was an error fetching recipes. Try again later.</p>";
        });
});