const express = require("express");
const app = express();

const path = require("path");

//make ejs supported views folder connect to express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//add public folder for style with express
app.use(express.static(path.join(__dirname, "public")));

//override
const { count } = require("console");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));

const mongoose = require('mongoose');
const port = 8080;

const Chat = require("./models/chat.js");

main()
.then((res) => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1 = new Chat({
//     from: "sib",
//     to: "kuntal",
//     massage: "Hii! How are you",
//     created_at: new Date(),
// });

// chat1.save().then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// })

app.get("/", (req, res) => {
    res.send("home reached");
})


//chat route
app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    res.render("chats.ejs", { chats });
})

//new route
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
    console.log("enter new route");
})

//create route
app.patch("/chats/new/add", (req,res) => {
    let {from: from, massage: msg, to: to} = req.body;
    console.log(from);
    console.log(msg);
    console.log(to);
    let newChat = {from: from, massage: msg, to: to, created_at: new Date()};
    const chat1 = new Chat(newChat);
    chat1.save();


    res.redirect("/chats");
})


//edit route
app.get('/chats/:id/edit', async (req, res) => {
    let {id} = req.params;
    console.log(id);
    let chat = await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs", {chat});
})

// update route
app.patch("/chats/:id/update", async (req, res) => {
    let {id} = req.params;
    let {massage: newMsg} = req.body;
    await Chat.findByIdAndUpdate(id, {massage: newMsg, created_at: new Date()});
    res.redirect("/chats");

})

// list route
app.patch("/chats/list", async (req, res) => {
    let {toChat} = req.body;
    let chats = await Chat.find({to: toChat});
    console.log(chats);
    if(chats.length == 0){
        res.render("empty.ejs");
    }
    res.render('list.ejs', {chats});
})

// delete
app.patch('/chats/:id/delete', async (req, res) => {
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
    
})


app.listen(port, () => {
    console.log(`listning the port ${port}`);
})