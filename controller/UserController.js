const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class UserController{
    static Adminregister = async(req,res)=>{
        res.render('admin/register',{message:req.flash('error')})
    }

    static Register = async(req,res)=>{
        // res.render('admin/register')
        // console.log(req.body)
        const{name,email,password,confirm_password} = req.body;
        const admin = await UserModel.findOne({email:email})
        if (admin) {
            req.flash('error','email already exists')
            return res.redirect('/admin/register')
        }
        else{
            if (name && email && password && confirm_password) {
                if (password == confirm_password) {
                    try{
                        const hashpassword = await bcrypt.hash(password,10)
                        const result = await UserModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                        })
                        await result.save()
                        req.flash('success','Registration successfull please login')
                        return res.redirect('/login')
                    }catch(err){
                        console.log(err)
                    }
                }else{
                    req.flash('error','password and confirm password does not match')
                    return res.redirect('/admin/register')
                }
            }
            else{
                req.flash('error','All field are required')
                return res.redirect('/admin/register')
            }
        }
    }

    static VerifyLogin = async(req,res)=>{
        try{
            const{email,password} = req.body;
            // console.log(password)
            if (email && password) {
                const user = await UserModel.findOne({email:email})
                // console.log(user.password)
                if (user != null) {
                    const isMatched = await bcrypt.compare(password,user.password)
                    if ((user.email === email) && isMatched) {
                        //verify token
                        const token = jwt.sign({ userId: user._id }, 'sujalblogproject123');
                        res.cookie('token',token)
                        // console.log(token)
                        res.redirect('/admin/dashboard')
                    }else{
                        req.flash('error','Email or Password is not valid')
                        return res.redirect('/login')
                    }
                }else{
                req.flash('error','You are not registered user')
                return res.redirect('/login')
                }
            } else {
                req.flash('error','All field are required')
                return res.redirect('/login')
            }
        }catch(err){
            console.log(err)
        }
    }

    static Logout = async(req,res)=>{
        try{
            // res.clearcookies('token')
            res.redirect('/login')
        }catch(err){
            console.log(err)
        }
    }
}

module.exports=UserController