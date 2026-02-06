import React, { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${props => props.theme.green}30;
  border-radius: 4px;
  background-color: rgba(48, 212, 3, 0.03);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid ${props => props.theme.green}50;
  border-radius: 4px;
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.green};
  font-family: 'Courier New', monospace;
  font-size: 1em;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.green};
    box-shadow: 0 0 5px ${props => props.theme.green}30;
  }

  &::placeholder {
    color: ${props => props.theme.green}40;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${props => props.theme.green};
  border-radius: 4px;
  background-color: transparent;
  color: ${props => props.theme.green};
  font-family: 'Courier New', monospace;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: rgba(48, 212, 3, 0.15);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #ff4444;
  font-size: 0.85em;
  margin-top: 8px;
`;

const RoomCreate = ({ onCreate, error = null }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && onCreate) {
      onCreate(title.trim());
      setTitle('');
    }
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter room title..."
          data-testid="room-title-input"
        />
        <SubmitButton type="submit" disabled={!title.trim()} data-testid="create-room-btn">
          Create Room
        </SubmitButton>
      </FormWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default RoomCreate;
