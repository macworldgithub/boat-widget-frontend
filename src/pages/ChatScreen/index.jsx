// import { useState, useRef, useEffect } from "react";
// import { Button, Input, Spin } from "antd";
// import { SendOutlined, CloseOutlined, MessageOutlined } from "@ant-design/icons";
// import { SERVER_URL } from "../../config";
// import image from "../../../public/pic.jpeg";
// import axios from "axios";
// import Cookies from "js-cookie";
// import "./ChatWidget.css";

// export default function ChatWidget() {
//   // Initialize isButtonVisible with cookie or localStorage
//   const [isButtonVisible, setIsButtonVisible] = useState(() => {
//     const isDismissedCookie = Cookies.get("chatButtonDismissed");
//     const isDismissedStorage = localStorage.getItem("chatButtonDismissed");
//     return isDismissedCookie !== "true" && isDismissedStorage !== "true";
//   });
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: "Hello! How can I assist you?", sender: "bot", showButtons: false },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   // Dismiss button handler
//   const handleDismissButton = () => {
//     setIsButtonVisible(false);
//     Cookies.set("chatButtonDismissed", "true", {
//       expires: 7,
//       path: "/",
//       domain: window.location.hostname,
//       sameSite: "Strict",
//     });
//     localStorage.setItem("chatButtonDismissed", "true");
//   };

//   // Show button handler
//   const handleShowButton = () => {
//     setIsButtonVisible(true);
//     Cookies.remove("chatButtonDismissed", {
//       path: "/",
//       domain: window.location.hostname,
//     });
//     localStorage.removeItem("chatButtonDismissed");
//   };

//   // Handle chat open with postMessage
//   const handleOpenChat = () => {
//     setIsOpen(true);
//     window.parent.postMessage(
//       {
//         event: 'iframeButtonClick',
//       },
//       '*'
//     );
//   };

//   // Parse URLs in messages
//   function parseLinks(text) {
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     return text.replace(urlRegex, (url) => {
//       return `<a href="${url}" target="_blank" style="color: #1D4ED8; text-decoration: underline;">${url}</a>`;
//     });
//   }

//   // Send message handler
//   const handleSend = async () => {
//     if (input.trim() === "") return;

//     const newMessages = [...messages, { text: input, sender: "user" }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post(`${SERVER_URL}/query`, {
//         query: input,
//       });
//       setMessages([
//         ...newMessages,
//         {
//           text: response.data.message,
//           sender: "bot",
//           showButtons: response.data.vehicleDetails ? true : false,
//         },
//       ]);
//     } catch (error) {
//       setMessages([
//         ...newMessages,
//         {
//           text: "Sorry, something went wrong. Please try again.",
//           sender: "bot",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="ai-chat-widget-wrapper">
//       {/* Chat Button */}
//       {isButtonVisible && !isOpen && (
//         <div className="chat-button-container">
//           <button className="chat-button" onClick={handleOpenChat}>
//             <svg className="chat-button-icon" viewBox="64 64 896 896" focusable="false" fill="currentColor">
//               <path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
//             </svg>
//             <span className="chat-button-text">How can I help?</span>
//           </button>
//           <Button
//             shape="circle"
//             icon={<CloseOutlined />}
//             className="dismiss-button"
//             onClick={handleDismissButton}
//             aria-label="Dismiss chat widget"
//           />
//         </div>
//       )}

//       {/* Toggle Button */}
//       {!isButtonVisible && !isOpen && (
//         <div className="chat-toggle-container">
//           <Button
//             shape="circle"
//             icon={<MessageOutlined />}
//             className="chat-toggle-button"
//             onClick={handleShowButton}
//             aria-label="Reopen chat widget"
//           />
//         </div>
//       )}

//       {/* Chat Popup */}
//       {isOpen && (
//         <div className="chat-popup">
//           <div className="chat-popup-header">
//             <span>Live Chat</span>
//             <CloseOutlined
//               className="chat-popup-close"
//               onClick={() => setIsOpen(false)}
//               aria-label="Close chat"
//             />
//           </div>

//           <div className="chat-popup-messages">
//             {messages.map((msg, index) => (
//               <div key={index} className="message-wrapper">
//                 {msg.sender !== "user" && (
//                   <img
//                     className="bot-avatar"
//                     src={image}
//                     alt="Bot Avatar"
//                   />
//                 )}
//                 <div
//                   className={msg.sender === "user" ? "user-message" : "bot-message"}
//                   dangerouslySetInnerHTML={{ __html: parseLinks(msg.text) }}
//                 ></div>
//               </div>
//             ))}

//             {loading && (
//               <div className="loading-message">
//                 <Spin size="small" />
//                 <span>Searching Inventory...</span>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="chat-popup-input">
//             <Input
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onPressEnter={handleSend}
//               aria-label="Message input"
//             />
//             <Button
//               shape="circle"
//               icon={<SendOutlined />}
//               className="custom-send-button"
//               onClick={handleSend}
//               disabled={loading}
//               aria-label="Send message"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { Button, Input, Spin } from "antd";
import { SendOutlined, CloseOutlined, MessageOutlined } from "@ant-design/icons";
import { SERVER_URL } from "../../config";
import image from "../../../public/pic.jpeg";
import axios from "axios";
import Cookies from "js-cookie";
import "./ChatWidget.css";

export default function ChatWidget() {
    const widgetId = "boat"; // Hardcoded widgetId
  
  // Initialize isButtonVisible with cookie or localStorage
  const [isButtonVisible, setIsButtonVisible] = useState(() => {
    const isDismissedCookie = Cookies.get("chatButtonDismissed");
    const isDismissedStorage = localStorage.getItem("chatButtonDismissed");
    return isDismissedCookie !== "true" && isDismissedStorage !== "true";
  });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot", showButtons: false },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Dismiss button handler
  const handleDismissButton = () => {
    setIsButtonVisible(false);
    Cookies.set("chatButtonDismissed", "true", {
      expires: 7,
      path: "/",
      domain: window.location.hostname,
      sameSite: "Strict",
    });
    localStorage.setItem("chatButtonDismissed", "true");
  };

  // Show button handler
  const handleShowButton = () => {
    setIsButtonVisible(true);
    Cookies.remove("chatButtonDismissed", {
      path: "/",
      domain: window.location.hostname,
    });
    localStorage.removeItem("chatButtonDismissed");
  };

  // Handle chat open with postMessage
  // const handleOpenChat = () => {
  //   setIsOpen(true);
  //   window.parent.postMessage(
  //     {
  //       event: 'iframeButtonClick',
  //     },
  //     '*'
  //   );
  // };
  const handleOpenChat = async () => {
  setIsOpen(true);
  window.parent.postMessage(
    {
      event: 'iframeButtonClick',
    },
    '*'
  );
  let userIP = '';
  try {
    const ipRes = await axios.get('https://api64.ipify.org?format=json');
    userIP = ipRes.data.ip;
    console.log(userIP)
  } catch (e) {
    console.error('IP fetch failed', e);
  }
  try {
    await axios.post(`https://widgetsanalytics.vercel.app/api/track-visitor`, {
      event: "chat_opened",
      timestamp: new Date().toISOString(),
      widgetId,
      ip: userIP,
    });
  } catch (error) {
    console.error("Failed to track visitor:", error);
  }
};

  // Parse URLs in messages
  function parseLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" style="color: #1D4ED8; text-decoration: underline;">${url}</a>`;
    });
  }

  // Send message handler
  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${SERVER_URL}/query`, {
        query: input,
      });
      setMessages([
        ...newMessages,
        {
          text: response.data.message,
          sender: "bot",
          showButtons: response.data.vehicleDetails ? true : false,
        },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat-widget-wrapper">
      {/* Chat Button */}
      {isButtonVisible && !isOpen && (
        <div className="chat-button-container">
          <button className="chat-button" onClick={handleOpenChat}>
            <svg className="chat-button-icon" viewBox="64 64 896 896" focusable="false" fill="currentColor">
              <path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
            </svg>
            <span className="chat-button-text">How can I help?</span>
          </button>
          <Button
            shape="circle"
            icon={<CloseOutlined />}
            className="dismiss-button"
            onClick={handleDismissButton}
            aria-label="Dismiss chat widget"
          />
        </div>
      )}

      {/* Toggle Button */}
      {!isButtonVisible && !isOpen && (
        <div className="chat-toggle-container">
          <Button
            shape="circle"
            icon={<MessageOutlined />}
            className="chat-toggle-button"
            onClick={handleShowButton}
            aria-label="Reopen chat widget"
          />
        </div>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-popup-header">
            <span>Live Chat</span>
            <CloseOutlined
              className="chat-popup-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            />
          </div>

          <div className="chat-popup-messages">
            {messages.map((msg, index) => (
              <div key={index} className="message-wrapper">
                {msg.sender !== "user" && (
                  <img
                    className="bot-avatar"
                    src={image}
                    alt="Bot Avatar"
                  />
                )}
                <div
                  className={msg.sender === "user" ? "user-message" : "bot-message"}
                  dangerouslySetInnerHTML={{ __html: parseLinks(msg.text) }}
                ></div>
              </div>
            ))}

            {loading && (
              <div className="loading-message">
                <Spin size="small" />
                <span>Searching Inventory...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-popup-input">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
              aria-label="Message input"
            />
            <Button
              shape="circle"
              icon={<SendOutlined />}
              className="custom-send-button"
              onClick={handleSend}
              disabled={loading}
              aria-label="Send message"
            />
          </div>
        </div>
      )}
    </div>
  );
}