const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const popupClosebtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');



const getRandomMeal = async() => {
    //first fetch the api data to get a response
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    //convert to Json
    const resData = await res.json();
    const randomMeal = resData.meals[0];

    addMeals(randomMeal, true);
    console.log(randomMeal);

};

getRandomMeal();

const getMealById = async(id) => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const resData = await res.json();
    const meal = resData.meals[0];

    return meal;

}

const getMealsBySearch = async(name) => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + name);
    const resData = await res.json();
    const meals = await resData.meals;

    return meals;

}

const addMeals = (mealData, random = false) => {

        const meal = document.createElement("div");
        meal.classList.add("meal");
        meal.innerHTML = String.raw `
            <div class="meal-header">
                ${random ? String.raw`
                    <span class="random">
                        Random Recipe
                    </span>` : ""};
                <img src="${mealData.strMealThumb}" 
                    alt="${mealData.strMeal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn active"><i class="fas fa-heart"></i></button>
            </div>
    
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () =>{
        if(btn.classList.contains("active")){
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove("active")
        }else{
            addMealToLS(mealData.idMeal);
            btn.classList.add("active");
        }

        fetchFavMeals();
        
    });
meal.addEventListener('click', ()=>{
    showMealInfo(mealData);
})

    //added the class to the meal dom
    mealsEl.appendChild(meal);
};


const showMealInfo = (mealData) => {
   
    // clean the div up
    const mealEl = document.createElement('div');

    const ingredients = [];
    // get the ingredient and measure
    for(let i = 1; i < 20; i++){
        if(mealData["strIngredient" +i]){
            ingredients.push(`${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`)
        }
        else{
            break;
        }
    };

    mealEl.innerHTML  = String.raw`
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="">


        <p>${mealData.strInstructions}</p>
        <h3>Ingredient:</h3>
        <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
            `
        // update the meal info
    mealInfoEl.appendChild(mealEl);
        // show the popup
    mealPopup.classList.remove('hidden');
}

const addMealToLS = (mealId) =>{
    const mealIds= getMealsFromLS();
    //adding the mealId tothe already existing mealIds
    localStorage.setItem("mealIds", JSON.stringify([...mealIds,mealId]));
}

const removeMealFromLS = (mealId)=>{
    const mealIds = getMealsFromLS();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));

}
const getMealsFromLS = () =>{
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}
const addMealsToFav = (mealData) => {

    const favMeal = document.createElement("li");
    
    favMeal.innerHTML = String.raw `
        <img src = "${mealData.strMealThumb}"
         alt="${mealData.strMeal}">
         <span>${mealData.strMeal}</span>
         <button class="clear"><i class="fas fa-window-close"></i></button>
       
        `;

    const btn = favMeal.querySelector('.clear');
        btn.addEventListener("click", () =>{
            removeMealFromLS(mealData.idMeal);

            fetchFavMeals();
        });
        favMeal.addEventListener('click', ()=>{
            showMealInfo(mealData);
        })
favoriteContainer.appendChild(favMeal);
}

const fetchFavMeals = async () =>{
    //clean the container
    favoriteContainer.innerHTML = '';
    const mealIds = getMealsFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);
        
        addMealsToFav(meal);
    }
}

searchBtn.addEventListener("click", async () =>{
    
    const search =  searchTerm.value;
    const meals = await getMealsBySearch(search);
    meals.innerHTML = "";

    if(meals){
           meals.forEach((meal) => {
        addMeals(meal);
    });
    } 
});

popupClosebtn.addEventListener('click', () =>{
    mealPopup.classList.add('hidden');
})