'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PetPhoto extends Model {
  pet(){
    this.belongsTo('App/Models/PetPhoto')
  }
}

module.exports = PetPhoto
