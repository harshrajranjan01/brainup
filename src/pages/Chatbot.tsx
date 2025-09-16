import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  Image, 
  Brain, 
  Lightbulb, 
  BookOpen, 
  Calculator,
  Atom,
  Globe,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BrainMascot } from "@/components/BrainMascot";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  subject?: string;
}

const quickSuggestions = [
  { text: "Explain photosynthesis", icon: BookOpen, subject: "Biology" },
  { text: "What's Pythagorean theorem?", icon: Calculator, subject: "Math" },
  { text: "How does gravity work?", icon: Atom, subject: "Physics" },
  { text: "Capitals of Europe", icon: Globe, subject: "Geography" },
];

const aiResponses: Record<string, string> = {
  "explain photosynthesis": "Photosynthesis is the process by which plants convert light energy (usually from the sun) into chemical energy. Here's how it works:\n\n**The Equation:** 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\n**Key Steps:**\n1. **Light Reactions** - Chlorophyll absorbs light in the thyloids\n2. **Calvin Cycle** - CO₂ is converted to glucose in the stroma\n\n**Why it matters:** This process produces oxygen for us to breathe and food for the entire food chain! 🌱",
  
  "what's pythagorean theorem": "The Pythagorean theorem is a fundamental principle in geometry! \n\n**Formula:** a² + b² = c²\n\n**What it means:**\n- In a right triangle, the square of the hypotenuse (longest side) equals the sum of squares of the other two sides\n- 'a' and 'b' are the legs, 'c' is the hypotenuse\n\n**Example:** If a triangle has sides of 3 and 4, the hypotenuse is:\n√(3² + 4²) = √(9 + 16) = √25 = 5\n\n**Real-world uses:** Construction, navigation, computer graphics! 📐",
  
  "how does gravity work": "Gravity is one of the four fundamental forces of nature! Here's the breakdown:\n\n**Einstein's View:**\n- Gravity isn't a force pulling objects together\n- It's the curvature of spacetime caused by mass and energy\n- Objects follow the 'straightest possible path' in curved spacetime\n\n**Key Points:**\n- More massive objects create more curvature\n- This is why Earth orbits the Sun (following spacetime curves)\n- Time moves slower in stronger gravitational fields\n\n**Fun fact:** You're experiencing time slightly slower at sea level than on a mountain! ⏰",
  
  "capitals of europe": "Here are some major European capitals organized by region:\n\n**Western Europe:**\n🇫🇷 France - Paris\n🇩🇪 Germany - Berlin\n🇪🇸 Spain - Madrid\n🇮🇹 Italy - Rome\n🇬🇧 UK - London\n\n**Eastern Europe:**\n🇵🇱 Poland - Warsaw\n🇨🇿 Czech Republic - Prague\n🇭🇺 Hungary - Budapest\n\n**Northern Europe:**\n🇸🇪 Sweden - Stockholm\n🇳🇴 Norway - Oslo\n🇩🇰 Denmark - Copenhagen\n\n**Memory tip:** Create stories linking countries with their capitals! 🗺️"
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI tutor. I can help you with any subject - from biology to physics to history. What would you like to learn about today? 🤖✨",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const normalizedInput = content.toLowerCase().trim();
      const response = aiResponses[normalizedInput] || 
        `I understand you're asking about "${content}". This is a great question! \n\nWhile I don't have a specific answer prepared for this exact query, I can help you break it down:\n\n1. **Define key terms** - What are the main concepts?\n2. **Find connections** - How does this relate to what you already know?\n3. **Practice examples** - Let's work through some problems together!\n\nCould you tell me more about what specific aspect you'd like to focus on? 🎯`;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <BrainMascot className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            AI <span className="text-gradient">Tutor</span>
          </h1>
          <p className="text-muted-foreground">
            Your personal learning companion - ask anything!
          </p>
        </div>

        {/* Chat Container */}
        <Card className="card-glow flex-1 flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary p-1">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gradient">AI Tutor</span>
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-muted/50 border border-border'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      <div className={`text-xs mt-2 flex items-center space-x-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{formatTimestamp(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary p-1">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gradient">AI Tutor</span>
                  </div>
                  <div className="bg-muted/50 border border-border p-4 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-3">Quick suggestions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-3 text-left"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <suggestion.icon className="w-4 h-4 mr-2 text-primary" />
                      <div>
                        <div className="font-medium text-sm">{suggestion.text}</div>
                        <div className="text-xs text-muted-foreground">{suggestion.subject}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="pr-20"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Image className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={() => sendMessage(input)}
                className="btn-hero px-4"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};