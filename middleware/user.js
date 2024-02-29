

const isLoged =(req,res,next)=>{
    try{
        if(req.session.user){
            res.redirect('/')
        }else{
            next()
        }
    }catch(err){
        console.log(err);
    }
} 


const notLoged=(req,res,next)=>{
    try{
        if(!req.session.user){
            res.redirect('/login')
        }else{
            next()
        }
    }catch(err){
        console.log(err);
    }
}

module.exports={
    isLoged,
    notLoged
}