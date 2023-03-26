/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema
    .createTable('recipes', (table) => {
      table.increments('id');
      table.string('name', 128).notNullable().unique();
    })
    .createTable('ingredients', (table) => {
      table.increments('id');
      table.string('name', 128).notNullable().unique();
    })
    .createTable('steps', (table) => {
      table.increments('id');
      table.integer('step_number').notNullable();
      table.string('instruction', 1024).notNullable();
      table.integer('recipe_id').unsigned().notNullable().references('id').inTable('recipes').onDelete('RESTRICT').onUpdate('RESTRICT');
    })
    .createTable('ingredients_steps', (table) => {
      table.increments('id');
      table.integer('ingredient_id').unsigned().notNullable().references('id').inTable('ingredients').onDelete('RESTRICT').onUpdate('RESTRICT');
      table.integer('step_id').unsigned().notNullable().references('id').inTable('steps').onDelete('RESTRICT').onUpdate('RESTRICT');
      table.float('quantity').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('ingredients_steps').dropTableIfExists('ingredients').dropTableIfExists('steps').dropTableIfExists('recipes');
};
