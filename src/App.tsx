import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8000");

    newSocket.onopen = () => {
      console.log("Connected");
      newSocket.send("Server is live now");
      setSocket(newSocket);
    };

    newSocket.onmessage = (msg) => {
      console.log(msg.data);
      setNewMessage(msg.data);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  if (!socket) {
    return <h1>Connecting...</h1>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3>Now you can type and broadcast messages</h3>
      <h4>{newMessage}</h4>
      <input
      style={{padding: '12px 20px'}}
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button onClick={() => socket.send(message)}>Send</button>
    </div>
  );
}

export default App;
