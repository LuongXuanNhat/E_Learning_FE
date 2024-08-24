interface Message {
    message_id: number;
    chat_room_id: number;
    sender_id: number;
    content: string;
    sent_at: Date;
  }