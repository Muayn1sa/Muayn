// MessageContext.js
import React, { createContext, useState, useContext } from 'react';

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const addMessage = (newMessage) => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  return (
    <MessageContext.Provider value={{ messages, setMessages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
