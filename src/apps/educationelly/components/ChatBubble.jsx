import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
`;

const ChatBubbleButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.theme.blue};
  border: 4px solid ${props => props.theme.orange};
  color: ${props => props.theme.white};
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
`;

const ChatWindowContainer = styled.div`
  position: fixed;
  bottom: 120px;
  right: 24px;
  width: 400px;
  height: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1001;
  animation: ${fadeIn} 0.3s ease-out;
  border: 3px solid ${props => props.theme.orange};
`;

const ChatHeader = styled.div`
  background: ${props => props.theme.blue};
  color: white;
  padding: 1rem 1.25rem;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MessageBubble = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: 85%;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
  ${props =>
    props.$isUser
      ? `
    background: ${props.theme.blue};
    color: ${props.theme.white};
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  `
      : `
    background: ${props.theme.green};
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  `}
`;

const InputContainer = styled.form`
  display: flex;
  padding: 0.75rem;
  border-top: 2px solid #eee;
  gap: 0.5rem;
`;

const ChatInput = styled.textarea`
  flex: 1;
  border: 2px solid ${props => props.theme.green};
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  resize: none;
  max-height: 100px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.blue};
  }
`;

const SendButton = styled.button`
  background: ${props => props.theme.blue};
  color: white;
  border: 2px solid ${props => props.theme.orange};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  padding: 0.75rem 1rem;
  align-self: flex-start;
  span {
    width: 8px;
    height: 8px;
    background: ${props => props.theme.green};
    border-radius: 50%;
    animation: ${bounce} 1.4s infinite ease-in-out;
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #666;
  text-align: center;
  padding: 2rem;
  font-size: 0.9rem;
  line-height: 1.6;
`;

export default function ChatBubble({ initialMessages = [], onSendMessage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: onSendMessage
        ? await onSendMessage(input.trim())
        : 'This is a simulated AI response. In the real app, this connects to the educationELLy AI backend.',
      timestamp: new Date().toISOString(),
      backend: 'openai',
      model: 'gpt-4',
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <>
      <ChatBubbleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </ChatBubbleButton>

      {isOpen && (
        <ChatWindowContainer>
          <ChatHeader>
            <span>educationELLy AI Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
            >
              ✕
            </button>
          </ChatHeader>

          <MessagesContainer>
            {messages.length === 0 ? (
              <EmptyState>
                <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</span>
                <p>Hi! I'm your AI teaching assistant. Ask me about ELL strategies, assessment approaches, or student support.</p>
              </EmptyState>
            ) : (
              messages.map(msg => (
                <MessageBubble key={msg.id} $isUser={msg.role === 'user'}>
                  {msg.content}
                </MessageBubble>
              ))
            )}
            {isLoading && (
              <LoadingDots>
                <span /><span /><span />
              </LoadingDots>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer onSubmit={handleSend}>
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about ELL strategies..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            <SendButton type="submit" disabled={!input.trim() || isLoading}>
              Send
            </SendButton>
          </InputContainer>
        </ChatWindowContainer>
      )}
    </>
  );
}
