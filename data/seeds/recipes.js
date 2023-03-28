/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('ingredients_steps').del();
  await knex('steps').del();
  await knex('ingredients').del();
  await knex('recipes').del();

  const recipes = await knex('recipes')
    .insert([{ name: 'Spaghetti Bolognese' }, { name: 'Chicken Tikka Masala' }, { name: 'Beef Stroganoff' }])
    .returning('*');

  const ingredients = await knex('ingredients')
    .insert([
      { name: 'spaghetti', quantity: 1.0 },
      { name: 'ground beef', quantity: 1.0 },
      { name: 'onion', quantity: 1.0 },
      { name: 'garlic', quantity: 1.0 },
      { name: 'tomato paste', quantity: 1.0 },
      { name: 'canned tomatoes', quantity: 1.0 },
      { name: 'olive oil', quantity: 1.0 },
      { name: 'chicken', quantity: 1.0 },
      { name: 'yogurt', quantity: 1.0 },
      { name: 'tomato sauce', quantity: 1.0 },
      { name: 'cream', quantity: 1.0 },
      { name: 'mushrooms', quantity: 1.0 },
      { name: 'beef', quantity: 1.0 },
      { name: 'sour cream', quantity: 1.0 },
      { name: 'dill', quantity: 1.0 },
    ])
    .returning('*');

  const steps = await knex('steps')
    .insert([
      { step_number: 1, instruction: 'Put a large saucepan on a medium heat', recipe_id: recipes[0].id },
      { step_number: 2, instruction: 'Add 1 tbsp olive oil', recipe_id: recipes[0].id },
      { step_number: 3, instruction: 'Add 1 finely chopped onion', recipe_id: recipes[0].id },
      { step_number: 4, instruction: 'Cook for 3-4 mins until softened', recipe_id: recipes[0].id },
      { step_number: 5, instruction: 'Add 2 minced garlic cloves and cook for 1 min', recipe_id: recipes[0].id },
      { step_number: 6, instruction: 'Add 500g ground beef and cook until browned', recipe_id: recipes[0].id },
      { step_number: 7, instruction: 'Stir in 2 tbsp tomato paste and cook for 1 min', recipe_id: recipes[0].id },
      { step_number: 8, instruction: 'Add 2 cans of tomatoes and bring to a simmer', recipe_id: recipes[0].id },
      { step_number: 9, instruction: 'Cook for 20-30 mins until thickened', recipe_id: recipes[0].id },
      { step_number: 1, instruction: 'Marinate 500g diced chicken in 150g yogurt and 2 tsp tikka masala paste', recipe_id: recipes[1].id },
      { step_number: 2, instruction: 'Put 1 tbsp oil in a pan and cook the chicken until browned', recipe_id: recipes[1].id },
      { step_number: 3, instruction: 'Remove the chicken from the pan and set aside', recipe_id: recipes[1].id },
      { step_number: 4, instruction: 'Add 1 diced onion and 2 minced garlic cloves to the pan and cook until softened', recipe_id: recipes[1].id },
      { step_number: 5, instruction: 'Add 1 can of tomato sauce and bring to a simmer', recipe_id: recipes[1].id },
      { step_number: 6, instruction: 'Stir in 150ml cream and simmer for 5-10 mins', recipe_id: recipes[1].id },
      { step_number: 7, instruction: 'Return the chicken to the pan and stir to coat in the sauce', recipe_id: recipes[1].id },
      { step_number: 8, instruction: 'Simmer for 5-10 mins until the chicken is cooked through', recipe_id: recipes[1].id },
      { step_number: 1, instruction: 'Slice 500g beef into thin strips', recipe_id: recipes[2].id },
      { step_number: 2, instruction: 'Cook the beef in 2 tbsp oil until browned', recipe_id: recipes[2].id },
      { step_number: 3, instruction: 'Remove the beef from the pan and set aside', recipe_id: recipes[2].id },
      { step_number: 4, instruction: 'Add 1 diced onion and 2 minced garlic cloves to the pan and cook until softened', recipe_id: recipes[2].id },
      { step_number: 5, instruction: 'Add 150g sliced mushrooms and cook until softened', recipe_id: recipes[2].id },
      { step_number: 6, instruction: 'Stir in 2 tbsp flour and cook for 1 min', recipe_id: recipes[2].id },
      { step_number: 7, instruction: 'Gradually stir in 250ml beef broth and 150ml sour cream', recipe_id: recipes[2].id },
      { step_number: 8, instruction: 'Simmer for 10-15 mins until thickened', recipe_id: recipes[2].id },
      { step_number: 9, instruction: 'Stir in 2 tbsp chopped dill and return the beef to the pan', recipe_id: recipes[2].id },
      { step_number: 10, instruction: 'Simmer for 5-10 mins until heated through', recipe_id: recipes[2].id },
    ])
    .returning('*');

  const ingredientsSteps = await knex('ingredients_steps').insert([
    { ingredient_id: ingredients[0].id, step_id: steps[0].id },
    { ingredient_id: ingredients[6].id, step_id: steps[1].id },
    { ingredient_id: ingredients[2].id, step_id: steps[2].id },
    { ingredient_id: ingredients[3].id, step_id: steps[3].id },
    { ingredient_id: ingredients[1].id, step_id: steps[5].id },
    { ingredient_id: ingredients[4].id, step_id: steps[7].id },
    { ingredient_id: ingredients[5].id, step_id: steps[7].id },
    { ingredient_id: ingredients[7].id, step_id: steps[10].id },
    { ingredient_id: ingredients[8].id, step_id: steps[1].id },
    { ingredient_id: ingredients[9].id, step_id: steps[5].id },
    { ingredient_id: ingredients[10].id, step_id: steps[5].id },
    { ingredient_id: ingredients[11].id, step_id: steps[6].id },
    { ingredient_id: ingredients[12].id, step_id: steps[8].id },
    { ingredient_id: ingredients[13].id, step_id: steps[7].id },
    { ingredient_id: ingredients[14].id, step_id: steps[9].id },
    { ingredient_id: ingredients[0].id, step_id: steps[10].id },
  ]);
};
