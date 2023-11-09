import {useEffect, useState} from "react";
import "./App.css";
import socket from "./server";

function App() {
  const [user,setUser] = useState(null);
  
  useEffect(()=>{
    askUserName();
  })

  const askUserName = ()=>{
    const userName = prompt("이름 입력");
    console.log(userName);

    //대화할 때
    socket.emit("login",userName,(res)=>{
      if(res?.ok){
        setUser(res.data);
      }
    });
  }
  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;
