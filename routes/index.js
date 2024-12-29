const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req, res){
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
});

// router.get("/shop", isLoggedIn, (req, res) => {
//     const images = [
//         "/images/image1.jpg",
//         "/images/image2.jpg",
//         "/images/image3.jpg",
//         "/images/image4.jpg",
//         "/images/image5.jpg",
//         "/images/image6.jpg",
//         "/images/image7.jpg",
//         "/images/image8.jpg",
//     ];
//     res.render("shop", { products: [], images });
// });

router.get("/shop", isLoggedIn, async function (req, res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", {products, success});
});


router.get("/cart", isLoggedIn, async function (req, res){
    let user = await userModel
    .findOne({email: req.user.email})
    .populate("cart");
    res.render("cart", {user});
});


router.get("/addtocart/:productid", isLoggedIn, async function (req, res){
   let user = await userModel.findOne({email: req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success", "added to cart");
   res.redirect("/shop");
});


router.get("/logout", isLoggedIn, function(res,req){
    res.render("shop");
});
module.exports = router;