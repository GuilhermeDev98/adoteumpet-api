'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')
const Env = use('Env')
const Cloudinary = use('App/Services/Cloudinary.js');

class UserController {

  async index(){
    try{
      return await User.all()
    }catch(err){
      return err
    }
  }

  async show({ params }){
    try{
      return await User.query().where('id', params.id).with('pets').fetch()
    }catch(err){
      return err
    }
  }

  async update({ params, request, response, auth }){

    if(auth.user.id == params.id || auth.user.status == 'admin' || auth.user.status == 'support'){

      try{
        let user = await User.findOrFail(params.id)

        user.username = request.input('username', user.username)
        user.email = request.input('email', user.email) 
        user.photoURL = await this.uploadPhoto(request)

        if(auth.user.status == 'admin'){
          user.status = request.input('status', user.status)
        }

        user.cep = request.input('cep', user.cep)
        user.cel = request.input('cel', user.cel)

        user.save()

        return user
      }catch(err){
        return response.badRequest()
      }

    }else{
      return response.forbidden()
    }
    
  }

  async delete({ params, response, auth }){
    if(auth.user.id == params.id || auth.user.status == 'admin' || auth.user.status == 'support'){

      try{
        let user = await User.findOrFail(params.id)

        user.delete()

        return response.noContent()
      }catch(err){
        return response.badRequest()
      }

    }else{
      return response.forbidden()
    }
    
  }

  async uploadPhoto(request){
    try {

      const file = request.file('profile_pic');
      const cloudinaryResponse = await Cloudinary.v2.uploader.upload(file.tmpPath, {folder: 'adoteumpet'});
      return cloudinaryResponse.secure_url;

    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = UserController
