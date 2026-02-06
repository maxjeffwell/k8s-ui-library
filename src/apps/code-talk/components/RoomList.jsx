import React from 'react';
import styled from 'styled-components';

const RoomListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RoomListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid ${props => props.theme.green}40;
`;

const Title = styled.h2`
  color: ${props => props.theme.green};
  font-family: 'Courier New', monospace;
  font-size: 1.4em;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const RoomCount = styled.span`
  color: ${props => props.theme.green}80;
  font-size: 0.9em;
`;

const RoomCard = styled.div`
  padding: 16px;
  border: 1px solid ${props => props.active ? props.theme.green : props.theme.green + '30'};
  border-radius: 4px;
  background-color: ${props => props.active ? 'rgba(48, 212, 3, 0.1)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.green};
    background-color: rgba(48, 212, 3, 0.05);
  }
`;

const RoomTitle = styled.h3`
  color: ${props => props.theme.green};
  font-family: 'Courier New', monospace;
  margin: 0 0 8px 0;
  font-size: 1.1em;
`;

const RoomMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.green}60;
  font-size: 0.8em;
`;

const RoomCreator = styled.span`
  font-style: italic;
`;

const DeleteButton = styled.button`
  background: none;
  border: 1px solid #ff4444;
  color: #ff4444;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 0.75em;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 68, 68, 0.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.green}60;
  font-style: italic;
`;

const RoomList = ({ rooms = [], activeRoomId = null, onRoomSelect, onRoomDelete }) => {
  return (
    <RoomListWrapper>
      <RoomListHeader>
        <Title>Rooms</Title>
        <RoomCount>{rooms.length} room{rooms.length !== 1 ? 's' : ''}</RoomCount>
      </RoomListHeader>
      {rooms.length === 0 ? (
        <EmptyState>No rooms available. Create one to get started.</EmptyState>
      ) : (
        rooms.map(room => (
          <RoomCard
            key={room.id}
            active={room.id === activeRoomId}
            onClick={() => onRoomSelect && onRoomSelect(room.id)}
            data-testid={`room-${room.id}`}
          >
            <RoomTitle>{room.title}</RoomTitle>
            <RoomMeta>
              <RoomCreator>by {room.user?.username || 'Anonymous'}</RoomCreator>
              <span>{new Date(room.createdAt).toLocaleDateString()}</span>
            </RoomMeta>
            {onRoomDelete && (
              <div style={{ marginTop: '8px', textAlign: 'right' }}>
                <DeleteButton
                  onClick={(e) => { e.stopPropagation(); onRoomDelete(room.id); }}
                  data-testid={`delete-room-${room.id}`}
                >
                  Delete
                </DeleteButton>
              </div>
            )}
          </RoomCard>
        ))
      )}
    </RoomListWrapper>
  );
};

export default RoomList;
