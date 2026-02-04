import { useEffect, useRef, useState } from "react";
import "../../Styles/PagesStyle/Chatbot.css";

export default function Chatbot() {
 const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm your Vicky Electronics assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInput("");

    const res = await fetch("https://vicky-ele-server-1.onrender.com/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();
    setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
  };

  return (
    <>
      {!open && (
        <div className="chat-icon" onClick={() => setOpen(true)}>
          💬
        </div>
      )}

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="bot-info">
              <div className="bot-avatar">🤖</div>
              <div>
                <div className="bot-name">Vicky Electronics</div>
                <div className="bot-status">Online</div>
              </div>
            </div>
            <span className="close-btn" onClick={() => setOpen(false)}>✕</span>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}