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

  async destroy ({ params, auth, response }){

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
    const photos = request.files('photos', {
      types: ['image'],
      size: '1mb'
    })

    photos._files.map( async file => {
      let cloudinaryResponse = await Cloudinary.uploader.upload(file.tmpPath, {folder: 'adoteumpet'})
      let secureUrl = await cloudinaryResponse.secure_url
      await PetPhoto.create({ url: secureUrl, pet_id: petId })
    })

  }

  async store({ request, auth }){
    const data = request.except(['photos'])

    const pet = await Pet.create({ user_id: auth.user.id, ...data })

    this.uploadPhotos(request, pet.id)

    return await Pet.query().where('id', pet.id).with('photos').fetch()
  }

}

module.exports = PetController
