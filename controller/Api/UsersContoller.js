const UserModel = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class UsersContoller{
    
    static Register = async(req,res)=>{
        // res.render('admin/register')
        // console.log(req.body)
        const{name,email,password,confirm_password} = req.body;
        const user = await UserModel.findOne({email:email})
        if (user) {
            res.send({
                status: "failed",
                message: "THIS EMAIL IS ALREADY EXIST"
            });
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
                        res.send({status:201,message:"REGISTRATION SUCCESSFULL"});
                    }catch(err){
                        console.log(err)
                    }
                }else{
                    res.send({
                        status: "failed",
                        message: "PASSWORD and CONFIRM-PASSWORD doesn't match"
                    });
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
                        const token = jwt.sign({ userId: user._id }, 'rahul12345');
                        res.cookie('token',token)
                        // console.log(token)
                        res.send({
                            status: "success",
                            message: "login successfully with web token",
                            "Token" : token
                        });
                    }else{
                        res.send({status:"failed" , message: "Email and Password not valid"})
                    }
                }else{
                    res.send({
                        status: "failed",
                        message: "you are not registered user"
                    });
                }
            } else {
                res.send({
                    status: "failed",
                    message: "THIS EMAIL IS ALREADY EXIST"
                });
            }
        }catch(err){
            console.log(err)
        }
    }

    static Logout = async(req,res)=>{
        try{
            res.clearcookies('token')
            res.send({
                status:"success",
                message: "Logout Successfully",
                token: "Token"
            });
        }catch(err){
            console.log(err)
        }
    }
}

module.exports=UsersContoller