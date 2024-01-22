const express = require('express');
const app = express();
const path = require("path");
const modcontrollers = require("./controllers/modcontrollers");
const cookieparser = require('cookie-parser');

// Express
app.use("./views", express.static("views"));
app.use(express.static(__dirname + "/views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// create application/json parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Cookies
app.use(cookieparser());
async function SetCookies(req,res,identificator){
    res.cookie("key",identificator,{
        maxAge: 900000,
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    })
    return "Cookies set";
}
async function CheckCookies(cookie,req,res){
    if (cookie.key){
        var logincheck = await database.login(cookie.key)
        if (logincheck == true){
            return true;    
        }
        else if (logincheck == false){
            return false;
        }
    }
    else {
        return false;
    }
}
// WEB GET Routes
app.get("/", async (req, res) => {
    var data = await modcontrollers.modcom();
    res.render("html/homepage", {data});
});

module.exports = app;