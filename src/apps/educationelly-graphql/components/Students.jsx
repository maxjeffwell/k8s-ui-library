import React, { useState, memo } from 'react';
import styled from 'styled-components';
import { Card, Icon, Input } from 'semantic-ui-react';

const StyledContainer = styled.div`
  padding: 1rem 2rem;
`;

const StyledHeader = styled.h2`
  color: ${props => props.theme.blue};
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  text-align: center;
  background: ${props => props.theme.green};
  padding: 1rem;
  border: 3px solid ${props => props.theme.orange};
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const StyledInput = styled(Input)`
  &&& input {
    border: 2px solid ${props => props.theme.green} !important;
    font-family: 'Roboto', sans-serif;
    &:focus {
      border-color: ${props => props.theme.blue} !important;
    }
  }
`;

const AddButton = styled.button`
  background: ${props => props.theme.blue};
  color: white;
  border: 2px solid ${props => props.theme.orange};
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    opacity: 0.9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

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
    font-weight: 600;
  }
  &&& .content .meta {
    color: ${props => props.theme.orange};
  }
`;

const StudentCount = styled.span`
  color: ${props => props.theme.blue};
  font-weight: 600;
  font-size: 0.9rem;
`;

const StudentCard = memo(({ student, onDelete }) => (
  <StyledCard>
    <Card.Content>
      <Card.Header>{student.fullName}</Card.Header>
      <Card.Meta>{student.school} — {student.gradeLevel}</Card.Meta>
      <Card.Description>
        <p><strong>Teacher:</strong> {student.teacher}</p>
        <p><strong>Native Language:</strong> {student.nativeLanguage}</p>
        <p><strong>ELL Status:</strong> {student.ellStatus}</p>
        <p><strong>Composite Level:</strong> {student.compositeLevel}</p>
        <p><strong>Designation:</strong> {student.designation}</p>
        <p><strong>Country:</strong> {student.countryOfBirth}</p>
      </Card.Description>
    </Card.Content>
    {onDelete && (
      <Card.Content extra>
        <button
          onClick={() => onDelete(student._id)}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          <Icon name="trash" /> Delete
        </button>
      </Card.Content>
    )}
  </StyledCard>
));

export default function Students({ students = [], onAddStudent, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = searchTerm
    ? students.filter(s =>
        [s.fullName, s.school, s.teacher, s.gradeLevel, s.ellStatus]
          .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : students;

  return (
    <StyledContainer>
      <StyledHeader>
        <Icon name="users" /> Students
      </StyledHeader>

      <SearchContainer>
        <StyledInput
          icon="search"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fluid
          style={{ flex: 1 }}
        />
        {onAddStudent && (
          <AddButton onClick={onAddStudent}>
            <Icon name="plus" /> Add Student
          </AddButton>
        )}
      </SearchContainer>

      <StudentCount>
        {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
        {searchTerm && ` for "${searchTerm}"`}
      </StudentCount>

      <Card.Group itemsPerRow={3} stackable style={{ marginTop: '1rem' }}>
        {filteredStudents.map(student => (
          <StudentCard key={student._id} student={student} onDelete={onDelete} />
        ))}
      </Card.Group>

      {filteredStudents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <Icon name="search" size="huge" />
          <p>{searchTerm ? `No students match "${searchTerm}"` : 'No students found.'}</p>
        </div>
      )}
    </StyledContainer>
  );
}
