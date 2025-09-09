var ingredientArray = [];

const ingInput = document.getElementById("ingInput");
const add = document.getElementById("addIng");
const remove = document.getElementById("removeIng");
const ingredientList = document.getElementById("ingredientList");
const searchButton = document.getElementById("searchButton");

// Add ingredient
add.addEventListener("click", function () {
    var newItem = document.createElement("li");
    newItem.textContent = ingInput.value;
    ingredientList.appendChild(newItem);
    ingredientArray.push(ingInput.value);
    ingInput.value = "";
});

// Remove ingredient
remove.addEventListener("click", function () {
    if (ingredientArray.length === 0) {
        return;
    }
    ingredientArray.pop();
    ingredientList.removeChild(ingredientList.lastChild);
});

// Search for recipes
searchButton.addEventListener("click", function () {
    if (ingredientArray.length === 0) {
        alert("Please add at least one ingredient");
        return;
    }

    // Save ingredients to localStorage
    localStorage.setItem("ingredientsArray", JSON.stringify(ingredientArray));

    // Go to results page
    window.location.href = "results.html";
});

