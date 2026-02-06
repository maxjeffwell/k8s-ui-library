import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
  border: 1px solid ${props => props.theme.green}30;
  border-radius: 4px;
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid ${props => props.theme.green}30;
  background-color: rgba(48, 212, 3, 0.05);
`;

const ChannelName = styled.span`
  color: ${props => props.theme.green};
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const UserCount = styled.span`
  color: ${props => props.theme.green}60;
  font-size: 0.8em;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  border-left: 2px solid ${props => props.isOwn ? props.theme.green : props.theme.green + '40'};
  background-color: ${props => props.isOwn ? 'rgba(48, 212, 3, 0.05)' : 'transparent'};
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Username = styled.span`
  color: ${props => props.theme.green};
  font-weight: bold;
  font-size: 0.85em;
`;

const Timestamp = styled.span`
  color: ${props => props.theme.green}40;
  font-size: 0.7em;
`;

const MessageText = styled.p`
  color: ${props => props.theme.white || '#EDEDED'};
  margin: 0;
  font-size: 0.95em;
  line-height: 1.5;
  word-break: break-word;
`;

const InputArea = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid ${props => props.theme.green}30;
  background-color: rgba(48, 212, 3, 0.03);
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid ${props => props.theme.green}40;
  border-radius: 4px;
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.green};
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  resize: none;
  outline: none;
  min-height: 40px;
  max-height: 120px;

  &:focus {
    border-color: ${props => props.theme.green};
  }

  &::placeholder {
    color: ${props => props.theme.green}30;
  }
`;

const SendButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${props => props.theme.green};
  border-radius: 4px;
  background-color: transparent;
  color: ${props => props.theme.green};
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;

  &:hover {
    background-color: rgba(48, 212, 3, 0.15);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const LoadMoreButton = styled.button`
  align-self: center;
  padding: 6px 16px;
  border: 1px dashed ${props => props.theme.green}40;
  border-radius: 4px;
  background: none;
  color: ${props => props.theme.green}60;
  font-family: 'Courier New', monospace;
  font-size: 0.8em;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.green};
    color: ${props => props.theme.green};
  }
`;

const MessageContainer = ({
  messages = [],
  roomTitle = 'Global Chat',
  currentUserId = '1',
  hasMore = false,
  onSendMessage,
  onLoadMore,
  onDeleteMessage
}) => {
  const [text, setText] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && onSendMessage) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <ContainerWrapper>
      <TopBar>
        <ChannelName>#{roomTitle}</ChannelName>
        <UserCount>{messages.length} messages</UserCount>
      </TopBar>
      <MessageList ref={listRef} data-testid="message-list">
        {hasMore && (
          <LoadMoreButton onClick={onLoadMore} data-testid="load-more">
            Load earlier messages
          </LoadMoreButton>
        )}
        {messages.map(msg => (
          <MessageBubble key={msg.id} isOwn={msg.user?.id === currentUserId}>
            <MessageHeader>
              <Username>{msg.user?.username || 'Anonymous'}</Username>
              <Timestamp>{new Date(msg.createdAt).toLocaleTimeString()}</Timestamp>
            </MessageHeader>
            <MessageText>{msg.text}</MessageText>
          </MessageBubble>
        ))}
      </MessageList>
      <InputArea onSubmit={handleSubmit}>
        <MessageInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
          rows={1}
          data-testid="message-input"
        />
        <SendButton type="submit" disabled={!text.trim()} data-testid="send-btn">
          Send
        </SendButton>
      </InputArea>
    </ContainerWrapper>
  );
};

export default MessageContainer;
