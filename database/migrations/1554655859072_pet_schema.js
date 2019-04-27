'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PetSchema extends Schema {
  up () {
    this.create('pets', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('age').notNullable()
      table.enu('type', ['Gato', 'Cachorro']).notNullable()
      table.enu('sex', ['Macho', 'Femea']).notNullable()
      table.enu('mOrY', ['Meses', 'Anos']).notNullable()
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
