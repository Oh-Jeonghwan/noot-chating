const mongoose = require("mongoose");
//require 라이브러리를 가져오는 명령어

//schema란? db의 설계도 정도
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },
    token: {
        type: String,
    },
    //user가 온라인인지 오프라인인지 보여줄 수 있느 필드
    online: {
        type: Boolean,
        default: false,
    },
});
module.exports = mongoose.model("User", userSchema);