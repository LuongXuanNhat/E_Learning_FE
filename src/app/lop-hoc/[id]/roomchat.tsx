"use client";
import { io } from "socket.io-client";
import { MiddlewareAuthen } from "@/middleware/Authen";
import { useEffect, useState, useRef } from "react";
import { getCookieUser } from "@/services/authService";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { Message } from "@/models/Message";

const socket = io("http://localhost:3002");

function RoomChatClass({ id }: { id: number }) {
  const [chatRoom, setChatRoom] = useState<ChatRoom>({
    class_id: 0,
    chat_room_id: 0,
    created_at: new Date(),
    name: "",
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  const fetchMessages = async (chat_room_id: number) => {
    const response = await fetch(
      `http://localhost:3002/api/chatrooms/${chat_room_id}/messages`
    );
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

    socket.emit("join", id);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [id]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || id === null) return;

    const data: Message = {
      chat_room_id: chatRoom.chat_room_id,
      content: newMessage,
      sender_id: getCookieUser()!.user_id,
      message_id: 0,
      sent_at: new Date(),
    };

    socket.emit("sendMessage", { roomId: id, message: data });
    setNewMessage("");
  };

  return (
    <Card className="w-full max-w-[1200px] mx-auto mt-5">
      <CardHeader
        color="blue"
        className="relative h-16 flex justify-center items-center"
      >
        <Typography variant="h5" color="white">
          {chatRoom.name}
        </Typography>
      </CardHeader>
      <CardBody
        className="overflow-y-auto"
        ref={messagesContainerRef}
        style={{ height: "400px" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender_id === getCookieUser()!.user_id
                ? "text-right"
                : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg w-3/4 ${
                msg.sender_id === getCookieUser()!.user_id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <div>
                <div
                  className={`capitalize px-4 w-fit rounded-md ${
                    msg.sender_id === getCookieUser()!.user_id
                      ? "bg-white text-blue-gray-700 flex ml-auto"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {msg.User!.name}
                </div>
                <Typography>{msg.content}</Typography>
              </div>
            </div>
            <Typography color="gray" className="text-xs mt-1">
              {new Date(msg.sent_at).toLocaleTimeString()}
            </Typography>
          </div>
        ))}
      </CardBody>
      <div className="p-4 flex">
        <Textarea
          rows={3}
          maxLength={2000}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập nội dung ..."
          className="flex-grow mr-2 border-gray-400 focus:outline-none focus:border-gray-600"
        />
        <Button
          ripple={true}
          className="ml-2"
          color="deep-orange"
          onClick={sendMessage}
        >
          Gửi
        </Button>
      </div>
    </Card>
  );
}

export default MiddlewareAuthen(RoomChatClass);
