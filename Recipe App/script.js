const mealsEl = document.getElementById("meals");

const getRandomMeal = async() => {
    //first fetch the api data to get a response
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    //convert to Json
    const resData = await res.json();
    const randomMeal = resData.meals[0];

    addMeal(randomMeal, true);
    console.log(randomMeal);
};

getRandomMeal();

const getMealById = async id => {
    const meal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

}

const getMealsBySearch = async name => {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/random.php' + name);

}

const addMeal = (mealData, random = false) => {
        const meal = document.createElement("div");
        meal.classList.add('meal');
        meal.innerHTML = String.raw `
            <div class="meal-header">
                ${random ? `<span class="random">
                    Random Recipe</span>` : ""};
                <img src="${mealData.strMealThumb}" alt="${mealData.Meal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn active"><i class="fas fa-heart"></i></button>
            </div>
    
    `;
    mealsEl.appendChild(meal);

}