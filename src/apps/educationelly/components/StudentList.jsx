import React, { memo } from 'react';
import styled from 'styled-components';
import { Card, Icon } from 'semantic-ui-react';

const StyledCard = styled(Card)`
  &&& {
    border: 2px solid ${props => props.theme.green} !important;
    border-radius: 8px !important;
    transition: all 0.2s ease;
    &:hover {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important;
      transform: translateY(-2px);
    }
  }
  &&& .content .header:not(.ui) {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', sans-serif;
    font-size: 1.1em;
    font-weight: 600;
  }
  &&& .content .meta {
    color: ${props => props.theme.orange};
  }
  &&& .content .description {
    color: #555;
  }
`;

const StyledButton = styled.button`
  border: 2px solid ${props => props.theme.orange};
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.white};
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  &:hover:not([disabled]) {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ListHeader = styled.h2`
  color: ${props => props.theme.blue};
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  background: ${props => props.theme.green};
  padding: 1rem;
  border: 3px solid ${props => props.theme.orange};
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.blue};
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
`;

const StudentCard = memo(({ student, onEdit, onDelete }) => (
  <StyledCard>
    <Card.Content>
      <Card.Header>{student.fullName}</Card.Header>
      <Card.Meta>{student.school} — {student.gradeLevel}</Card.Meta>
      <Card.Description>
        <p><strong>Teacher:</strong> {student.teacher}</p>
        <p><strong>ELL Status:</strong> {student.ellStatus}</p>
        <p><strong>Composite Level:</strong> {student.compositeLevel}</p>
        <p><strong>Designation:</strong> {student.designation}</p>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {onEdit && (
          <StyledButton onClick={() => onEdit(student)}>
            <Icon name="edit" /> Edit
          </StyledButton>
        )}
        {onDelete && (
          <StyledButton onClick={() => onDelete(student.id)} style={{ backgroundColor: '#e74c3c' }}>
            <Icon name="trash" /> Delete
          </StyledButton>
        )}
      </div>
    </Card.Content>
  </StyledCard>
));

export default function StudentList({ students = [], onEdit, onDelete, loading = false }) {
  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading students...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <ListHeader>
        <Icon name="users" /> Student List ({students.length} students)
      </ListHeader>
      {students.length === 0 ? (
        <EmptyState>
          <Icon name="student" size="huge" />
          <p>No students found. Click "Add New Student" to get started.</p>
        </EmptyState>
      ) : (
        <Card.Group itemsPerRow={3} stackable>
          {students.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Card.Group>
      )}
    </div>
  );
}
