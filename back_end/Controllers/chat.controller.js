const Chat = require("../Models/cheat");
const chatCnotroller = {}

chatCnotroller.saveChat = async(message, user)=> {
    const newMessage = new Chat({
        chat:message,
        user:{
            id:user._id, //왜 언더바가???? nodejs 강의 ㄱㄱ
            name:user.name
        }
    });
    await newMessage.save();
    return newMessage;
}

module.exports = chatCnotroller