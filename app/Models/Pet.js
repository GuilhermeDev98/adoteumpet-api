'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pet extends Model {
  user(){
    return this.belongsTo('App/Models/User')
  }

  photos(){
    return this.hasMany('App/Models/PetPhoto')
  }
}

module.exports = Pet
