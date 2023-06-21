const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const CheckUserAuth = async(req,res,next)=>{
    // console.log('Not Authorised user')
    const{token} = req.cookies;
    // console.log(token)
    if (!token) {
        req.flash('error','unauthorized user! please login')
        return res.redirect('/login')
    }else{
        const verify_token = jwt.verify(token,'sujalblogproject123')
        // console.log(verify_token)
        const data = await UserModel.findOne({_id:verify_token.userId})
        // console.log(data)
        req.data1 = data;
        next()
    }
}

module.exports=CheckUserAuth