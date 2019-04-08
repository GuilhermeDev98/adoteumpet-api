'use strict'

const Schema = use('Schema')

class PetPhotoSchema extends Schema {
  up () {
    this.create('pet_photos', (table) => {
      table.increments()
      table.string('url').notNullable()
      table.integer('pet_id').unsigned().notNullable()
      table.foreign('pet_id').references('pets.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('pet_photos')
  }
}

module.exports = PetPhotoSchema
