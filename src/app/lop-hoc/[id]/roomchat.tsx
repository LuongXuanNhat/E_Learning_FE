"use client";
import { io } from 'socket.io-client';
import { MiddlewareAuthen } from "@/middleware/Authen";
import { useEffect, useState, useRef } from "react";
import { getCookieUser } from '@/services/authService';
import { Button, Input, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

const socket = io('http://localhost:3002');

function RoomChatClass({ id }: { id: number }) {
  const [chatRoom, setChatRoom] = useState<ChatRoom>({
    class_id: 0,
    chat_room_id: 0,
    created_at: new Date(),
    name: ""
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchMessages = async (chat_room_id: number) => {
    const response = await fetch(`http://localhost:3002/api/chatrooms/${chat_room_id}/messages`);
    const data = await response.json();
    setMessages(data);
  };

  const fetchChatRoom = async () => {
    const response = await fetch(`http://localhost:3002/api/chatrooms/${id}`);
    const data = await response.json();
    setChatRoom(data);
    fetchMessages(data.chat_room_id);
  };

  useEffect(() => {
    fetchChatRoom();

    socket.emit('join', id);

    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [id]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || id === null) return;

    const data: Message = {
      chat_room_id: chatRoom.chat_room_id,
      content: newMessage,
      sender_id: getCookieUser()!.user_id,
      message_id: 0,
      sent_at: new Date()
    };

    socket.emit('sendMessage', { roomId: id, message: data });
    setNewMessage('');
  };

  return (
    <Card className="w-full max-w-[500px] mx-auto">
      <CardHeader color="blue" className="relative h-16">
        <Typography variant="h5" color="white">
          {chatRoom.name}
        </Typography>
      </CardHeader>
      <CardBody className="overflow-y-auto" style={{height: "400px"}}>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.sender_id === getCookieUser()!.user_id ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.sender_id === getCookieUser()!.user_id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <Typography>{msg.content}</Typography>
            </div>
            <Typography color="gray" className="text-xs mt-1">
              {new Date(msg.sent_at).toLocaleTimeString()}
            </Typography>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardBody>
      <div className="p-4 flex">
        <Input
          crossOrigin=""
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Nhập nội dung ..."
          className="flex-grow mr-2"
        />
        <Button ripple={true} onClick={sendMessage}>Send</Button>
      </div>
    </Card>
  );
}

export default MiddlewareAuthen(RoomChatClass);