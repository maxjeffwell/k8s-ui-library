export const mockStudents = [
  {
    id: '1',
    _id: '1',
    fullName: 'Maria Garcia',
    school: 'Lincoln Elementary',
    teacher: 'Ms. Johnson',
    gradeLevel: '3rd Grade',
    ellStatus: 'Active',
    compositeLevel: 'Early Intermediate',
    designation: 'ELL',
  },
  {
    id: '2',
    _id: '2',
    fullName: 'Carlos Rodriguez',
    school: 'Washington Middle School',
    teacher: 'Mr. Chen',
    gradeLevel: '6th Grade',
    ellStatus: 'Active',
    compositeLevel: 'Intermediate',
    designation: 'ELL',
  },
  {
    id: '3',
    _id: '3',
    fullName: 'Anh Nguyen',
    school: 'Lincoln Elementary',
    teacher: 'Ms. Thompson',
    gradeLevel: '4th Grade',
    ellStatus: 'Monitored',
    compositeLevel: 'Early Advanced',
    designation: 'RFEP',
  },
  {
    id: '4',
    _id: '4',
    fullName: 'Fatima Al-Hassan',
    school: 'Jefferson Elementary',
    teacher: 'Ms. Johnson',
    gradeLevel: '2nd Grade',
    ellStatus: 'Active',
    compositeLevel: 'Beginning',
    designation: 'ELL',
  },
  {
    id: '5',
    _id: '5',
    fullName: 'Dmitri Petrov',
    school: 'Washington Middle School',
    teacher: 'Mr. Chen',
    gradeLevel: '7th Grade',
    ellStatus: 'Former',
    compositeLevel: 'Advanced',
    designation: 'RFEP',
  },
  {
    id: '6',
    _id: '6',
    fullName: 'Yuki Tanaka',
    school: 'Lincoln Elementary',
    teacher: 'Ms. Thompson',
    gradeLevel: '5th Grade',
    ellStatus: 'Active',
    compositeLevel: 'Intermediate',
    designation: 'ELL',
  },
];

export const mockPagination = {
  page: 1,
  limit: 25,
  total: 6,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

export const mockPaginationMultiPage = {
  page: 2,
  limit: 25,
  total: 75,
  totalPages: 3,
  hasNext: true,
  hasPrev: true,
};

export const mockChatMessages = [
  { id: 1, role: 'assistant', content: 'Hello! I\'m the educationELLy AI assistant. How can I help you with your English Language Learner students today?', timestamp: new Date().toISOString() },
  { id: 2, role: 'user', content: 'What strategies work best for Beginning level ELL students?', timestamp: new Date().toISOString() },
  { id: 3, role: 'assistant', content: 'For Beginning level ELL students, here are some effective strategies:\n\n1. **Visual Supports** - Use pictures, diagrams, and graphic organizers\n2. **Total Physical Response (TPR)** - Connect language with movement\n3. **Sentence Frames** - Provide structured templates for responses\n4. **Bilingual Resources** - Allow native language support when possible\n5. **Repetition & Modeling** - Demonstrate expectations clearly', timestamp: new Date().toISOString(), backend: 'openai', model: 'gpt-4' },
];

export const VALID_ELL_STATUS = ['Active', 'Former', 'Never', 'Monitored', 'Exited', 'Waived'];
export const VALID_COMPOSITE_LEVELS = ['Beginning', 'Early Intermediate', 'Intermediate', 'Early Advanced', 'Advanced', 'N/A'];
export const VALID_DESIGNATIONS = ['ELL', 'RFEP', 'IFEP', 'EO', 'TBD'];
