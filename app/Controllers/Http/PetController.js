'use strict'

const Pet = use('App/Models/Pet')
const PetPhoto = use('App/Models/PetPhoto')
const Cloudinary = use('App/Services/Cloudinary.js');

class PetController {
  async index(){
    try{
      return await Pet.query().with('photos').fetch()
    }catch(err){
      return response.status(400).json({
        status: 'error',
        message: err
      })
    }
  }

  async show ({ params, response }){
    try{

      const pet = await Pet.query().where('id', params.id).with('user').with('photos').fetch()

      return pet
    }catch(err){
      return response.status(400).json({
        status: 'error',
        message: err
      })
    }
  }

  async update({ params, request, response, auth }){

    const pet = await Pet.findOrFail(params.id)
    const petOwner = pet.user_id

    if(pet.user_id == auth.user.id || auth.user.status == 'admin' || auth.user.status == 'support' ){
      try {

        const data = request.all()
        pet.merge({ ...data })
        pet.user_id = petOwner
        await pet.save()

        return pet

      } catch (err) {

        return response.status(400).json({
          status: 'error',
          message: err
        })

      }
    }else{
      return response.forbidden()
    }
  }

  async delete ({ params, auth, response }){

    const pet = await Pet.findOrFail(params.id)

    if(pet.user_id == auth.user.id || auth.user.status == 'admin' || auth.user.status == 'support'){

      try{

        pet.delete()

        return response.noContent()
      }catch(err){
        return response.status(400).json({
          status: 'error',
          message: err
        })
      }

    }else{
      return response.forbidden()
    }
  }

  async uploadPhotos(request, petId){
    try {

      const photos = request.file('photos', {
        types: ['image']
      })

      photos._files.map( async file => {
        let cloudinaryResponse = await Cloudinary.uploader.upload(file.tmpPath, {folder: 'adoteumpet'})
        let secureUrl = await cloudinaryResponse.secure_url
        await PetPhoto.create({ url: secureUrl, pet_id: petId })
      })

    } catch (err) {
      console.log(err)
    }
  }

  async store({ request, auth }){
    const data = request.all()

      const pet = await Pet.create({ user_id: auth.user.id, ...data })

      this.uploadPhotos(request, pet.id)

      return await Pet.query().where('id', pet.id).with('photos').fetch()
  }

}

module.exports = PetController
