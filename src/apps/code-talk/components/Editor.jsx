import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  border: 2px solid ${props => props.theme.green};
  border-radius: 4px;
  background-color: ${props => props.theme.black};
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid ${props => props.theme.green}40;
  background-color: rgba(48, 212, 3, 0.05);
`;

const EditorTitle = styled.span`
  color: ${props => props.theme.green};
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const StatusIndicator = styled.span`
  color: ${props => props.connected ? props.theme.green : '#ff4444'};
  font-size: 0.8em;
  &::before {
    content: '●';
    margin-right: 6px;
  }
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  width: 100%;
  padding: 16px;
  border: none;
  outline: none;
  resize: none;
  font-family: 'Courier New', monospace;
  font-size: 1.1em;
  line-height: 1.6;
  color: ${props => props.theme.green};
  background-color: ${props => props.theme.black};
  caret-color: ${props => props.theme.green};

  &::placeholder {
    color: ${props => props.theme.green}40;
  }

  &::selection {
    background-color: ${props => props.theme.green}30;
  }
`;

const EditorFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
  border-top: 1px solid ${props => props.theme.green}40;
  font-size: 0.75em;
  color: ${props => props.theme.green}80;
`;

const Editor = ({
  initialCode = '',
  roomId = null,
  connected = true,
  typingUser = null,
  onCodeChange,
  readOnly = false
}) => {
  const [code, setCode] = useState(initialCode);
  const [lineCount, setLineCount] = useState(initialCode.split('\n').length);

  const handleChange = useCallback((e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setLineCount(newCode.split('\n').length);
    if (onCodeChange) onCodeChange(newCode);
  }, [onCodeChange]);

  return (
    <EditorWrapper>
      <EditorHeader>
        <EditorTitle>Code Talk Editor</EditorTitle>
        <StatusIndicator connected={connected}>
          {connected ? 'Connected' : 'Disconnected'}
        </StatusIndicator>
      </EditorHeader>
      <StyledTextarea
        value={code}
        onChange={handleChange}
        placeholder="Start typing code..."
        spellCheck="false"
        readOnly={readOnly}
        data-testid="code-editor"
      />
      <EditorFooter>
        <span>{lineCount} lines</span>
        {typingUser && <span>{typingUser} is typing...</span>}
        {roomId && <span>Room: {roomId}</span>}
      </EditorFooter>
    </EditorWrapper>
  );
};

export default Editor;
