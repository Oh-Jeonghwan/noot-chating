import {useEffect, useState} from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user,setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log("message List", messageList);
  
  useEffect(()=>{
    socket.on("message",(message)=>{
      setMessageList((prevState)=>prevState.concat(message)); //what prevState????
    });
    askUserName();
  },[]); //유즈이펙트의 의존성 배열이 빈배열 [] 이면 컴포넌트가 마운트 될 떄만 실행 

  const askUserName = ()=>{
    const userName = prompt("이름 입력");
    console.log(userName);

    //대화할 때
    socket.emit("login",userName,(res)=>{
      if(res?.ok){
        setUser(res.data);
      }
    });
  };
  const sendMessage = (event) => {
    event.preventDefault(); //onSubmit의 새로고침 방지
    socket.emit("sendMessage",message,(res)=>{
      console.log("sendMessage res",res);
    });
  };
  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user}/>
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default App;
