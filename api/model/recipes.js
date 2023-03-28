const /**@typeof {import 'knex'.Knex} */ db = require('../../data/db-config');

const get = async () => {
  /**
   * Shape: {
      "recipe_id" : 1,
      "recipe_name": "Spaghetti Bolognese",
      "created_at": "2021-01-01 08:23:19.120",
      "steps": [
        {
          "step_id": 11,
          "step_number": 1,
          "step_instructions": "Put a large saucepan on a medium heat",
          "ingredients": []
        },
        {
          "step_id": 12,
          "step_number": 2,
          "step_instructions": "Add 1 tbsp olive oil",
          "ingredients": [
            { "ingredient_id": 27, "ingredient_name": "olive oil", "quantity": 0.014 }
          ]
        },
      ]
    }
   */
  const query = db('ingredients_steps as inst')
    .select(
      's.step_number',
      's.instruction as step_instructions',
      'i.name as ingredient_name',
      'i.quantity',
      'i.id as ingredient_id',
      's.id as step_id',
      's.step_number',
      'r.name',
      'r.createdAt',
      'r.id as recipe_id'
    )
    .join('ingredients as i', 'inst.ingredient_id', '=', 'i.id')
    .join('steps as s', 'inst.step_id', '=', 's.id')
    .join('recipes as r', 'r.id', '=', 's.recipe_id')
    .orderBy(['r.id', 's.step_number']);

  const recipes = await query;

  const result = recipes.reduce((acc, cur) => {
    const recipe = acc.find((r) => r.recipe_id === cur.recipe_id);
    if (recipe) {
      const step = recipe.steps.find((s) => s.step_id === cur.step_id);
      if (step) {
        step.ingredients.push({
          ingredient_id: cur.ingredient_id,
          ingredient_name: cur.ingredient_name,
          quantity: cur.quantity,
        });
      } else {
        recipe.steps.push({
          step_id: cur.step_id,
          step_number: cur.step_number,
          step_instructions: cur.step_instructions,
          ingredients: [
            {
              ingredient_id: cur.ingredient_id,
              ingredient_name: cur.ingredient_name,
              quantity: cur.quantity,
            },
          ],
        });
      }
    } else {
      acc.push({
        recipe_id: cur.recipe_id,
        recipe_name: cur.name,
        created_at: cur.createdAt,
        steps: [
          {
            step_id: cur.step_id,
            step_number: cur.step_number,
            step_instructions: cur.step_instructions,
            ingredients: [
              {
                ingredient_id: cur.ingredient_id,
                ingredient_name: cur.ingredient_name,
                quantity: cur.quantity,
              },
            ],
          },
        ],
      });
    }
    return acc;
  }, []);

  return result;
};

module.exports = {
  get,
};
