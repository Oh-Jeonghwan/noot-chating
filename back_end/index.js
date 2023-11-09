const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
require("dotenv").config(); //process 를 들고오기 위해

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000" //프론트엔드 주소
    }
});

require("./utils/io")(io); //utils의 io js를 매개변수 추가하여 실행한다.

httpServer.listen(process.env.PORT, () => {
    console.log("server listening on port", process.env.PORT)
});