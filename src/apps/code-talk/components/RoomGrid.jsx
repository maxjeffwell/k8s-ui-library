import React from 'react';
import styled from 'styled-components';
import MessageContainer from './MessageContainer';
import Editor from './Editor';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0;
  height: 600px;
  border: 1px solid ${props => props.theme.green}30;
  border-radius: 4px;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const Panel = styled.div`
  overflow: hidden;
  border-right: ${props => props.divider ? `1px solid ${props.theme.green}30` : 'none'};

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: ${props => props.divider ? `1px solid ${props.theme.green}30` : 'none'};
  }
`;

const RoomGrid = ({
  messages = [],
  code = '',
  roomTitle = 'Code Room',
  currentUserId = '1',
  onSendMessage,
  onCodeChange,
  typingUser = null
}) => {
  return (
    <GridWrapper>
      <Panel divider>
        <MessageContainer
          messages={messages}
          roomTitle={roomTitle}
          currentUserId={currentUserId}
          onSendMessage={onSendMessage}
        />
      </Panel>
      <Panel>
        <Editor
          initialCode={code}
          connected={true}
          typingUser={typingUser}
          onCodeChange={onCodeChange}
        />
      </Panel>
    </GridWrapper>
  );
};

export default RoomGrid;
