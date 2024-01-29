const chatCnotroller = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

module.exports = function(io) {
    //io~~
    //emit 듣는거
    io.on("connection", async(socket) => {
        console.log("client is connected", socket.id);
        
        socket.on("login",async(userName,cb)=>{
            //유저정보를 저장
            try{
                const user = await userController.saveUser(userName,socket.id);
                
                const welcomeMessage={
                    chat:`${user.name} is joined to ths room`,
                    user: {id:null, name: "system"}
                };

                io.emit("message", welcomeMessage);

                cb({ok:true, data:user});
            }catch(error){
                cb({ok:false, error: error.message});
            }
            
        });

        //메시지 받을 때
        socket.on("sendMessage",async(message,cb)=>{
            try {
                //socket id 로 유저 찾기
                const user = await userController.chckUser(socket.id);
                //메시지 저장
                const newMessage = await chatCnotroller.saveChat(message,user);
                
                //저장 후 단순 콜백 x 접속해 있는 사람들에게 알려준다
                io.emit("message",newMessage);
                cb({ok:true});

            } catch(error){
                cb({ok:false, error: error.message});
            }
            
        });

        //소켓이 닫혔을 때
        socket.on("disconnect",()=>{
            console.log("user is disconnected");
        });
    });

    //on 말하는거
};