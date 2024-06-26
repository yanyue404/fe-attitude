// http://huihuawk.com/front/async-await/

(async () => {
  const pizzaData = await getPizzaData(); // async call
  const drinkData = await getDrinkData(); // async call
  const chosenPizza = choosePizza(); // sync call
  const chosenDrink = chooseDrink(); // sync call
  await addPizzaToCart(chosenPizza); // async call
  await addDrinkToCart(chosenDrink); // async call
  orderItems(); // async call
})();


// refactor

async function selectPizza() {
  const pizzaData = await getPizzaData()    // async call
  const chosenPizza = choosePizza()    // sync call
  await addPizzaToCart(chosenPizza)    // async call
}

async function selectDrink() {
  const drinkData = await getDrinkData()    // async call
  const chosenDrink = chooseDrink()    // sync call
  await addDrinkToCart(chosenDrink)    // async call
}

(async () => {
  const pizzaPromise = selectPizza();
  const drinkPromise = selectDrink();
  await pizzaPromise;
  await drinkPromise;
  orderItems(); // async call
})();
