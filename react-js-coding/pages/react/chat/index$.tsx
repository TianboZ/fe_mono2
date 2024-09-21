import { useEffect, useRef, useState } from "react";

type Message = {
  messageId: number;
  userId: number;
  text: string;
  timestamp: string;
};
const MESSAGES: Message[] = [
  {
    messageId: 1,
    userId: 1,
    text: "Hey Bob, how are you?",
    timestamp: "2024-09-17T10:15:00Z",
  },
  {
    messageId: 2,
    userId: 2,
    text: "I'm good, Alice! How about you?",
    timestamp: "2024-09-17T10:16:00Z",
  },
  {
    messageId: 3,
    userId: 1,
    text: "I'm doing well, thanks!",
    timestamp: "2024-09-17T10:17:00Z",
  },
  {
    messageId: 4,
    userId: 3,
    text: "Hey everyone, what's up?",
    timestamp: "2024-09-17T10:18:00Z",
  },
  {
    messageId: 5,
    userId: 2,
    text: "Not much, just catching up.",
    timestamp: "2024-09-17T10:19:00Z",
  },
  {
    messageId: 6,
    userId: 1,
    text: "Yeah, it's been a busy week.",
    timestamp: "2024-09-17T10:20:00Z",
  },
  {
    messageId: 7,
    userId: 3,
    text: "Same here, so much to do!",
    timestamp: "2024-09-17T10:21:00Z",
  },
  {
    messageId: 8,
    userId: 2,
    text: "Let’s meet up soon!",
    timestamp: "2024-09-17T10:22:00Z",
  },
];

const ChatHistory = ({
  messages,
  uid,
  bottomRef,
}: {
  messages: Message[];
  uid: number;
  bottomRef: any;
}) => {
  return (
    <div
      style={{ height: "500px", overflow: "scroll", backgroundColor: "wheat" }}
    >
      {messages.map((msg, index) => {
        const isMsgFromSelf = msg.userId === uid;
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: isMsgFromSelf ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "green",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
};
const ChatRoom = () => {
  const [messages, setMessages] = useState(MESSAGES);
  const [msg, setMsg] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [shouldScrollBottom, setShouldScrollBottom] = useState(true);

  const scrollBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMsg = () => {
    const newMsg: Message = {
      userId: 1,
      text: msg,
      timestamp: "2024-09-18T10:22:00Z",
      messageId: Date.now(),
    };
    setMessages([...(messages || []), newMsg]);
    setMsg("");
    setShouldScrollBottom(true);
  };

  useEffect(() => {
    if (shouldScrollBottom) {
      scrollBottom();
      setShouldScrollBottom(false);
    }
  }, [messages]);

  return (
    <div>
      <ChatHistory messages={messages} uid={1} bottomRef={bottomRef} />
      <div>
        <input
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          placeholder="input..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMsg();
            }
          }}
          autoFocus
        />
        <button onClick={handleSendMsg} type="button">
          submit
        </button>
      </div>
    </div>
  );
};
export default ChatRoom;
