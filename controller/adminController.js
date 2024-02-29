require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../model/userSchema')
const home = async(req,res)=>{
    try{
        const allUsers=await User.find()
        res.render('home',{allUsers})
    }catch(err){
        console.log(err)
    }
} 

const login = (req,res)=>{
    try{
        const error = req.flash("err")
        res.render('login',{error})
    }catch(err){
        console.log(err)
    }
}


const loginSubmit = (req,res)=>{
    try{
        const {email,password}=req.body
        if(process.env.adminEmail==email){
            if(process.env.adminPassword==password){
                req.session.admin=email
                res.redirect('/admin/')
            }else{
                const error = "Password not matched"
                req.flash("err",error)
                res.redirect('/admin/login')
            }
        }else{
            const error = "Email is not found"
            req.flash("err",error)
            res.redirect('/admin/login')
        }
    }catch(err){
        console.log(err)
    }
}


const deleteuser=async(req,res)=>{
    try{
        const userId=req.params.id
        await User.deleteOne({_id:userId})
        res.redirect('/admin/')
    }catch(error){
        console.log(error);
    }
}


const updateUser=async(req,res)=>{
    try{
       const userId=req.params.id
        const user= await User.findOne({_id:userId})
        const message=req.flash('err')
       res.render('editUser',{user,message})

    }catch(err){
        console.log(err)
    }
}

const editUser=async(req,res)=>{
    try{
        const {username,email}=req.body
        const userId=req.params.id
        const findUser=await User.findOne({Email:email})
        if(findUser){
            if(findUser._id==userId){
                const user = await User.findOneAndUpdate({_id:userId},{Name:username,Email:email})
                await user.save()
            }else{
                const message="Already"
                req.flash('err',message)
              return  res.redirect(`/admin/updateuser/${userId}`)
            }
        }else{
            const user = await User.findOneAndUpdate({_id:userId},{Name:username,Email:email})
            await user.save()
        }


       
        res.redirect('/admin/')
    }catch(err){
        console.log(err);
    }
}

const createUser=async(req,res)=>{
    try{
        res.render('createUser') 
    }catch(err){
        console.log(err);
    }
}

const createUserSubmit=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const bcryptPassword= await bcrypt.hash(password,10)
        const user=new User({
            Name:username,
            Email:email,
            Password:bcryptPassword
        })
        await user.save()
        res.redirect('/admin')
    }catch(err){
        console.log(err);
    }
}

const logout = (req,res)=>{
    try{
        req.session.admin=null
        res.redirect('/admin/login')
    }catch(err){
        console.log(err);
    }
}



module.exports = {
    home,
    login,
    loginSubmit,
    deleteuser,
    updateUser,
    editUser,
    createUser,
    createUserSubmit,
    logout
}