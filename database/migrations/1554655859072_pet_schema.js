'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PetSchema extends Schema {
  up () {
    this.create('pets', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('age').notNullable()
      table.enu('type', ['cat', 'dog']).notNullable()
      table.enu('sex', ['male', 'female']).notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.string('state', 2).notNullable()
      table.string('city').notNullable()
      table.string('cep').notNullable()
      table.boolean('isAdoted').defaultTo(0)
      table.date('adotedAt')

      table.foreign('user_id').references('users.id').onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('pets')
  }
}

module.exports = PetSchema
