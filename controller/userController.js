const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const login = (req,res)=>{
    try{
        const success=req.flash('succ')
        const failure = req.flash('err')
        
        res.render("base",{success,failure})
    }catch(err){
        console.log(err);
    }
}


const home = async (req,res)=>{
    try{
        const userid=req.session.user
        const user= await User.findOne({_id:userid})
       res.render('home',{user})
    }catch(err){
        console.log(err);
    }
}

const register = (req,res)=>{
    try{
        const failer = req.flash('err')

        res.render('signup',{failer})
    }catch(err){
        console.log(err)
    }
}


const registerSubmit =async (req,res)=>{
    try{
       const {username,email,password}=req.body
      const checking=await User.findOne({Email:email})
      if(checking){
        const message = "email already exist"
        req.flash('err',message)
        res.redirect('/register')
      }else{
        const bcryptPassword =await bcrypt.hash(password,10)
        const user = new User({
         Name:username,
         Email:email,
         Password:bcryptPassword
        })
        await user.save()
        const msg = "Registered Successfully"
        req.flash('succ',msg)
        res.redirect('/login')
      }
    }catch(err){
        console.log(err)
    }
}
const loginSubmit = async(req,res)=>{
    try{
        const{email,password}=req.body
        const check = await User.findOne({Email:email})
        if(check){
            const passwordMatch = await bcrypt.compare(password, check.Password)
        if(passwordMatch){
            req.session.user=check._id
            console.log(req.session.user);
            res.redirect('/')
            
        }else{
            const error = "Password is not match"
            req.flash('err',error)
            res.redirect('/login')
        }
    }else{
        const error = "Email is not match"
        req.flash('err',error)
        res.redirect('/login')
    }
    }catch(err){
        console.log(err);
    }
}

const logout = (req,res)=>{
    try{
        req.session.user=null
        res.redirect('/login')
    }catch(err){
        console.log(err)
    }
}



module.exports={
    login,
    home,
    register,
    registerSubmit,
    loginSubmit,
    logout
}