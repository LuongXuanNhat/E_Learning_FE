interface ChatRoom {
    chat_room_id: number;
    class_id: number;
    name: string;
    created_at: Date;

    Messages?: Messages[];
  }