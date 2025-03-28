
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, User, Bot, ArrowRight } from "lucide-react";

// Sample chat history
const initialChats = [
  { id: 1, title: "Contract Review Questions", lastMessage: "What are the key elements of a valid contract?", date: "5 hours ago" },
  { id: 2, title: "Legal Research on Swiss Employment Law", lastMessage: "Can you explain the notice periods?", date: "Yesterday" },
  { id: 3, title: "Trademark Registration Process", lastMessage: "How do I register a trademark in Switzerland?", date: "Oct 12, 2023" },
];

// Sample messages for the first chat
const initialMessages = [
  { id: 1, sender: "user", content: "What are the key elements of a valid contract under Swiss law?" },
  { id: 2, sender: "bot", content: "Under Swiss law, the key elements of a valid contract are:\n\n1. Mutual consent (offer and acceptance)\n2. Legal capacity of the parties\n3. Lawful object/purpose\n4. Compliance with form requirements (when applicable)\n\nThe Swiss Code of Obligations (CO) primarily regulates contract law. Unlike some jurisdictions, Swiss law generally follows the principle of freedom of contract, allowing parties significant flexibility in establishing the terms of their agreement." },
  { id: 3, sender: "user", content: "Are there any specific form requirements for different types of contracts?" },
  { id: 4, sender: "bot", content: "Yes, while most contracts don't require a specific form in Switzerland, there are important exceptions:\n\n- Real estate purchases must be notarized\n- Donation promises must be in writing\n- Surety agreements require written form\n- Employment contracts don't require written form but are recommended\n- Consumer credit agreements must be in writing\n\nWould you like more details about any of these specific contract types?" },
];

const Chatbot = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const newMessage = { id: messages.length + 1, sender: "user", content: message };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = { 
          id: messages.length + 2, 
          sender: "bot", 
          content: "I understand your question about form requirements. Let me provide more detailed information based on Swiss law..." 
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-legal-gray-900">Legal Assistant</h1>
      
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-4">
          <div className="flex h-[calc(100vh-230px)]">
            {/* Chat List Sidebar */}
            <div className="hidden md:block w-64 border-r overflow-y-auto">
              <div className="p-3">
                <h2 className="font-semibold text-legal-gray-700 mb-2">Chat History</h2>
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      className={`w-full text-left p-2 rounded text-sm transition-colors
                        ${activeChat === chat.id 
                          ? "bg-legal-gray-200" 
                          : "hover:bg-legal-gray-100"
                        }`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="font-medium truncate">{chat.title}</div>
                      <div className="text-xs text-legal-gray-500 truncate">
                        {chat.lastMessage}
                      </div>
                      <div className="text-xs text-legal-gray-400 mt-1">
                        {chat.date}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              <div className="border-b p-4">
                <h2 className="font-semibold">
                  {chats.find(c => c.id === activeChat)?.title}
                </h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === "user" 
                        ? "bg-legal-primary text-white rounded-tr-none" 
                        : "bg-legal-gray-200 text-legal-gray-800 rounded-tl-none"
                      }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {msg.sender === "user" 
                          ? <User size={14} /> 
                          : <Bot size={14} />
                        }
                        <span className="text-xs font-semibold">
                          {msg.sender === "user" ? "You" : "Legal Assistant"}
                        </span>
                      </div>
                      <div className="whitespace-pre-line text-sm">{msg.content}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your legal question..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {chats.map((chat) => (
                  <div key={chat.id} className="p-4 border rounded-lg flex justify-between items-center group">
                    <div>
                      <div className="font-medium">{chat.title}</div>
                      <div className="text-sm text-legal-gray-500">{chat.date}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100"
                      onClick={() => setActiveChat(chat.id)}
                    >
                      Open <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Chatbot;
