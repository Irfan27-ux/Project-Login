import { useState, useRef, useEffect } from 'react';
import { COURSES_DATA } from '../data/coursesData';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello! 👋 I'm your Course Center AI Assistant. How can I help you today?",
    time: 'Just now',
  },
];

const SUGGESTIONS = [
  "What courses do you offer?",
  "How do I sign in?",
  "How does enrollment work?",
  "Are certificates provided?",
];

export default function AIChatbot({ onNavigate, currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const messageIdRef = useRef(100);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  // AI Knowledge-based response generator
  const generateBotReply = (userQuery) => {
    const query = userQuery.toLowerCase().trim();

    if (query.includes('course') || query.includes('class') || query.includes('catalog') || query.includes('offer')) {
      const titles = COURSES_DATA.map((c) => `• ${c.title} (${c.duration}, ${c.category})`).join('\n');
      return {
        text: `We offer 6 industry-focused programs:\n\n${titles}\n\nWould you like to browse the full catalog?`,
        action: { label: 'Explore Courses 📚', view: 'courses' },
      };
    }

    if (query.includes('sign up') || query.includes('create account') || query.includes('register')) {
      return {
        text: "You can create a new student account anytime! Just open the Sign In screen and switch to the 'Sign Up' tab. Enter your full name, email, and password to immediately activate your account.",
        action: { label: 'Go to Sign Up 📝', view: 'login' },
      };
    }

    if (query.includes('login') || query.includes('sign in') || query.includes('password') || query.includes('account')) {
      return {
        text: currentUser
          ? `You are already signed in as ${currentUser.email}! You can view your enrolled courses on your Student Dashboard.`
          : "Signing in is super simple! You only need an Email Address and Password. You can also use the 'Auto-fill sample' button or switch to 'Sign Up' to create a new account.",
        action: {
          label: currentUser ? 'Open Dashboard 👤' : 'Go to Sign In 🔑',
          view: currentUser ? 'profile' : 'login',
        },
      };
    }

    if (query.includes('enroll') || query.includes('join') || query.includes('register')) {
      return {
        text: "Enrolling is easy! Go to the Courses page, find a program you like, and click 'Enroll Now'. Once enrolled, it will immediately appear under your Student Dashboard with active progress tracking.",
        action: { label: 'Go to Courses 🎓', view: 'courses' },
      };
    }

    if (query.includes('certificat') || query.includes('diploma') || query.includes('accredit')) {
      return {
        text: "Yes! 📜 Every student receives an accredited digital certificate upon completing all lessons and submitting their final hands-on capstone project. Certificates can be shared directly on LinkedIn and your resume.",
      };
    }

    if (query.includes('mentor') || query.includes('instructor') || query.includes('teacher') || query.includes('faculty')) {
      return {
        text: "Our mentors are active industry practitioners! Leaders like David Miller (Senior Lead Architect), Dr. Sarah Chen (Head of AI & Data Science), and Emma Watson (Principal Designer) review your projects directly.",
        action: { label: 'Read About Mentors 👨‍🏫', view: 'about' },
      };
    }

    if (query.includes('price') || query.includes('cost') || query.includes('fee') || query.includes('free')) {
      return {
        text: "All courses in this demo portal are 100% free to explore! You can enroll in any program and track your learning progress directly in your browser without any credit card or backend requirements.",
      };
    }

    if (query.includes('contact') || query.includes('support') || query.includes('help') || query.includes('email') || query.includes('phone')) {
      return {
        text: "You can reach our student admissions team at admissions@coursecenter.edu or call +1 (800) 555-0199. Our office is located at 100 Innovation Way, Suite 400, San Francisco, CA.",
        action: { label: 'Contact Details 📍', view: 'about' },
      };
    }

    if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
      return {
        text: `Hello there! 👋 ${currentUser ? `Welcome back, ${currentUser.email.split('@')[0]}!` : 'Welcome to Course Center!'} What would you like to know about our courses or learning portal?`,
      };
    }

    // Default friendly response
    return {
      text: "I can help you with anything regarding Course Center! You can ask about our available courses, how to sign in, enrollment steps, instructors, certificates, or student support.",
    };
  };

  const handleSend = (textToSend) => {
    const content = textToSend || inputValue;
    if (!content.trim()) return;

    messageIdRef.current += 1;
    const userMsgId = messageIdRef.current;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: userMsgId,
      sender: 'user',
      text: content.trim(),
      time: timeString,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Bot reply
    setTimeout(() => {
      messageIdRef.current += 1;
      const botMsgId = messageIdRef.current;
      const botResponse = generateBotReply(content);

      const botMessage = {
        id: botMsgId,
        sender: 'bot',
        text: botResponse.text,
        action: botResponse.action,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="ai-chatbot-root">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          className="chatbot-trigger-btn"
          onClick={handleOpenChat}
          aria-label="Open Course Center AI Chatbot"
        >
          <div className="chatbot-trigger-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span className="chatbot-trigger-label">Ask AI</span>
          {unreadCount > 0 && <span className="chatbot-unread-pill">{unreadCount}</span>}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-bot-meta">
              <div className="chatbot-avatar-circle">
                <span>🤖</span>
                <span className="chatbot-online-ring"></span>
              </div>
              <div className="chatbot-title-group">
                <h3>Course Center AI</h3>
                <span className="chatbot-substatus">Online &bull; 24/7 Academic Support</span>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                className="btn-chatbot-header-icon"
                onClick={handleResetChat}
                title="Restart Chat"
              >
                🔄
              </button>
              <button
                type="button"
                className="btn-chatbot-header-icon btn-close"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="chatbot-suggestions-bar">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className="suggestion-chip"
                onClick={() => handleSend(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages Flow */}
          <div className="chatbot-messages-area">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="chat-avatar-mini">🤖</div>
                )}
                <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <p className="bubble-text">{msg.text}</p>
                  
                  {msg.action && (
                    <button
                      type="button"
                      className="bubble-action-btn"
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate(msg.action.view);
                        }
                      }}
                    >
                      {msg.action.label}
                    </button>
                  )}

                  <span className="bubble-timestamp">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row bot-row">
                <div className="chat-avatar-mini">🤖</div>
                <div className="chat-bubble bot-bubble typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="chatbot-input-bar">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about courses, enrollment, login..."
              autoFocus
            />
            <button
              type="button"
              className="btn-chatbot-send"
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              title="Send Message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

