const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");

// module.exports.registerUser = async function (req, res){

//     try{
//         let {email, fullname, password} = req.body;
//         let user = await userModel.findOne({email: email});
//         if(user) return res.status(401).send("You already have an account")
//         bcrypt.genSalt(10, function (err, salt){
//             bcrypt.hash(password, salt, async function(err, hash){
//                 if(err) return res.send(err.message);
//                 else{
//                     let user = await userModel.create({
//                         email,
//                         password: hash,
//                         fullname,
//                     });
//                     let token = generateToken(user);
//                     res.cookie("token", token);
//                     res.send("user created succesfully");
//                 } 

//             });
//         });

       
//     }catch(err){
//         console.log(err.message);
//     }
// }

// module.exports.loginUser = async function(req, res){
//     let {email, password} = req.body;
//     let user = await userModel.findOne({email: email});
//     if(!user)
//         return res.send("Email or password incorrect");

//     bcrypt.compare(password, user.password, function(err, result){
//         if(result){
//             let token = generateToken(user);
//             res.cookie("token", token);
//             res.send("you can login");
//         }
//         else{
//             res.send("Email or password incorrect");
//         }
//     })
// }
module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have an account");
        
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("User created successfully");
                }
            });
        });
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (!user) {
        req.flash("error", "Email or password incorrect");
        return res.redirect("/"); // Redirect back to the login page on error
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop"); // Redirect to /shop on successful login
        } else {
            req.flash("error", "Email or password incorrect");
            res.redirect("/"); // Redirect back to the login page on error
        }
    });
};

module.exports.logout = function (req, res){
    res.cookie("token", "");
    res.redirect("/");
}