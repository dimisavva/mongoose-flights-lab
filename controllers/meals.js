import { Meal } from "../models/meals.js";

function newMeal(req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: 'Add Meal',
      meals
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  newMeal as new,
}