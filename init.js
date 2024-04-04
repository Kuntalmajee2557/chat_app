const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
main()
    .then((res) => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allChat =
    [
        {
            from: "sib",
            to: "kuntal",
            massage: "Hii! How are you",
            created_at: new Date(),
        },
        {
            from: "sib",
            to: "tika",
            massage: "phone ta ene dao",
            created_at: new Date(),
        },
        {
            from: "motu",
            to: "patlu",
            massage: "samosa kothai",
            created_at: new Date(),
        },
        {
            from: "bheem",
            to: "chutki",
            massage: "laddu ene dao",
            created_at: new Date(),
        },
        {
            from: "gandu",
            to: "vodai",
            massage: "aro pod maro",
            created_at: new Date(),
        },
    ];

    Chat.insertMany(allChat);
