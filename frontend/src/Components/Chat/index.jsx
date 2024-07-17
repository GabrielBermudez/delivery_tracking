import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { format } from "date-fns";
import UserSvg from "../../assets/userSvg";
import DeliverySvg from "../../assets/deliverySvg";
import axios from "axios";
import { BASE_URL, routes } from '../../Utils/routes';

export const Chat = ({mensajes, setMensajes}) => {
  const flatListRef = useRef(null);

  const [inputMessage, setInputMessage] = useState("");
  

  const sendMessage = () => {
    if (inputMessage.trim().length > 0) {
      axios
      .post(`${BASE_URL}/${routes.mensaje.enviar}`, {
        mensaje: inputMessage,
        fecha: format(new Date(), 'hh:mm').toString(),
      });

      const newMessage = {
        id: mensajes.length + 1,
        mensaje: inputMessage,
        fecha: format(new Date(), 'hh:mm'),
        type: "Client",
      };
      setMensajes(prevMensajes => [...prevMensajes, newMessage]);
      setInputMessage("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    flatListRef.current.scrollTop = flatListRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  
  const renderItem = (item) => (
    <div
      key={`${item.mensaje}_${item.fecha}`}
      style={{
        display: "flex",
        justifyContent: item.type === "Client" ? "flex-end" : "flex-start",
      }}
    >
      <div
        className={item.type === "Client" ? "rowClient" : "row"}
        key={item.id}
      >
        {item.type === "Client" ? <UserSvg /> : <DeliverySvg />}
        <div className="textContainer">
          <div
            className={
              item.type === "Client" ? "messageTextClient" : "messageText"
            }
          >
            {item.mensaje}
          </div>
          <div
            className={item.type === "Client" ? "dateTextClient" : "dateText"}
          >
            {item.fecha}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="title">Chat</h1>
      <div className="container">
        <div className="flatListContainer" ref={flatListRef}>
          {mensajes.length > 0 && mensajes.map(renderItem)}
        </div>
      </div>
      <div className="inputContainer">
        <input
          className="textInput"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button className="sendButton" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};
