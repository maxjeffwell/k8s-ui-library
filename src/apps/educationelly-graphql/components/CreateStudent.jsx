import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Segment, Dropdown, Icon } from 'semantic-ui-react';
import { ELL_STATUS_OPTIONS, COMPOSITE_LEVEL_OPTIONS, DESIGNATION_OPTIONS } from '../mocks/data';

const StyledSegment = styled(Segment)`
  &&& {
    border: 3px solid ${props => props.theme.orange} !important;
    border-radius: 8px !important;
    max-width: 800px;
    margin: 2rem auto !important;
    padding: 2rem !important;
  }
`;

const FormTitle = styled.h2`
  color: ${props => props.theme.blue};
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled(Form)`
  &&& .field label {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
  }
  &&& .ui.input input {
    border: 2px solid ${props => props.theme.green};
    font-family: 'Roboto', sans-serif;
    &:focus {
      border-color: ${props => props.theme.blue};
    }
  }
  &&& .ui.selection.dropdown {
    border: 2px solid ${props => props.theme.green} !important;
    &:focus, &.active {
      border-color: ${props => props.theme.blue} !important;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: ${props => props.theme.blue};
  color: white;
  border: 2px solid ${props => props.theme.orange};
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    opacity: 0.9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const INITIAL_STATE = {
  fullName: '',
  school: '',
  teacher: '',
  gradeLevel: '',
  nativeLanguage: '',
  ellStatus: '',
  compositeLevel: '',
  designation: '',
  countryOfBirth: '',
};

export default function CreateStudent({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || INITIAL_STATE);

  const handleChange = (e, { name, value }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <StyledSegment>
      <FormTitle>
        <Icon name="student" /> {initialData ? 'Update Student' : 'Create New Student'}
      </FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            label="Full Name"
            name="fullName"
            placeholder="Student full name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <Form.Input
            label="School"
            name="school"
            placeholder="School name"
            value={formData.school}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            label="Teacher"
            name="teacher"
            placeholder="Teacher name"
            value={formData.teacher}
            onChange={handleInputChange}
            required
          />
          <Form.Input
            label="Grade Level"
            name="gradeLevel"
            placeholder="e.g., 3rd Grade"
            value={formData.gradeLevel}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            label="Native Language"
            name="nativeLanguage"
            placeholder="Native language"
            value={formData.nativeLanguage}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Country of Birth"
            name="countryOfBirth"
            placeholder="Country of birth"
            value={formData.countryOfBirth}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>ELL Status</label>
            <Dropdown
              selection
              name="ellStatus"
              placeholder="Select ELL Status"
              options={ELL_STATUS_OPTIONS}
              value={formData.ellStatus}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Composite Level</label>
            <Dropdown
              selection
              name="compositeLevel"
              placeholder="Select Composite Level"
              options={COMPOSITE_LEVEL_OPTIONS}
              value={formData.compositeLevel}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Designation</label>
            <Dropdown
              selection
              name="designation"
              placeholder="Select Designation"
              options={DESIGNATION_OPTIONS}
              value={formData.designation}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>

        <SubmitButton type="submit">
          <Icon name="save" /> {initialData ? 'Update Student' : 'Create Student'}
        </SubmitButton>
      </StyledForm>
    </StyledSegment>
  );
}
