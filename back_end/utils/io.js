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
                cb({ok:true, data:user});
            }catch(error){
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