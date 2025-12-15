import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  // ⬇️ TARO DI SINI
  const send = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setChat([...chat, { role: "user", text: input }, { role: "ai", text: data.reply }]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chatbot</h2>

      {chat.map((c, i) => (
        <p key={i}>
          <b>{c.role}:</b> {c.text}
        </p>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={send}>Kirim</button>
    </div>
  );
}

export default App;
