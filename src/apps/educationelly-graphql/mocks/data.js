export const mockStudents = [
  {
    _id: 'gql-1',
    fullName: 'Sofia Hernandez',
    school: 'Roosevelt Elementary',
    teacher: 'Ms. Williams',
    gradeLevel: '3rd Grade',
    nativeLanguage: 'Spanish',
    ellStatus: 'ACTIVE_ELL',
    compositeLevel: 'EARLY_INTERMEDIATE',
    designation: 'ELL',
    countryOfBirth: 'Mexico',
  },
  {
    _id: 'gql-2',
    fullName: 'Wei Chen',
    school: 'Roosevelt Elementary',
    teacher: 'Mr. Davis',
    gradeLevel: '5th Grade',
    nativeLanguage: 'Mandarin',
    ellStatus: 'ACTIVE_ELL',
    compositeLevel: 'INTERMEDIATE',
    designation: 'ELL',
    countryOfBirth: 'China',
  },
  {
    _id: 'gql-3',
    fullName: 'Ahmed Hassan',
    school: 'Kennedy Middle School',
    teacher: 'Ms. Park',
    gradeLevel: '7th Grade',
    nativeLanguage: 'Arabic',
    ellStatus: 'MONITORING',
    compositeLevel: 'EARLY_ADVANCED',
    designation: 'RFEP',
    countryOfBirth: 'Syria',
  },
  {
    _id: 'gql-4',
    fullName: 'Anya Petrova',
    school: 'Kennedy Middle School',
    teacher: 'Mr. Garcia',
    gradeLevel: '6th Grade',
    nativeLanguage: 'Russian',
    ellStatus: 'ACTIVE_ELL',
    compositeLevel: 'BEGINNING',
    designation: 'ELL',
    countryOfBirth: 'Ukraine',
  },
  {
    _id: 'gql-5',
    fullName: 'Kenji Yamamoto',
    school: 'Roosevelt Elementary',
    teacher: 'Ms. Williams',
    gradeLevel: '4th Grade',
    nativeLanguage: 'Japanese',
    ellStatus: 'EXITED',
    compositeLevel: 'ADVANCED',
    designation: 'RFEP',
    countryOfBirth: 'Japan',
  },
];

export const mockSession = {
  me: { _id: 'user-gql-123', email: 'demo@educationelly-graphql.example' },
};

export const mockChatMessages = [
  { id: 1, role: 'assistant', content: 'Welcome! I\'m the educationELLy-GraphQL AI assistant. How can I assist you with your ELL program management?', timestamp: new Date().toISOString() },
  { id: 2, role: 'user', content: 'How do I track student reclassification progress?', timestamp: new Date().toISOString() },
  { id: 3, role: 'assistant', content: 'To track reclassification progress, you can:\n\n1. **Monitor composite levels** — Watch for students reaching "Early Advanced" or "Advanced"\n2. **Check ELL status transitions** — Filter by "Monitoring" status for students in the reclassification pipeline\n3. **Review designation changes** — RFEP (Reclassified Fluent English Proficient) indicates successful reclassification\n\nYou can use the student list filters to view students by their current status.', timestamp: new Date().toISOString(), backend: 'openai', model: 'gpt-4' },
];

export const ELL_STATUS_OPTIONS = [
  { key: 'active', value: 'ACTIVE_ELL', text: 'Active ELL' },
  { key: 'exited', value: 'EXITED', text: 'Exited' },
  { key: 'monitoring', value: 'MONITORING', text: 'Monitoring' },
  { key: 'never', value: 'NEVER_ELL', text: 'Never ELL' },
  { key: 'refused', value: 'REFUSED_SERVICES', text: 'Refused Services' },
];

export const COMPOSITE_LEVEL_OPTIONS = [
  { key: 'beg', value: 'BEGINNING', text: 'Beginning' },
  { key: 'ei', value: 'EARLY_INTERMEDIATE', text: 'Early Intermediate' },
  { key: 'int', value: 'INTERMEDIATE', text: 'Intermediate' },
  { key: 'ea', value: 'EARLY_ADVANCED', text: 'Early Advanced' },
  { key: 'adv', value: 'ADVANCED', text: 'Advanced' },
  { key: 'pro', value: 'PROFICIENT', text: 'Proficient' },
];

export const DESIGNATION_OPTIONS = [
  { key: 'ell', value: 'ELL', text: 'ELL' },
  { key: 'rfep', value: 'RFEP', text: 'RFEP' },
  { key: 'ifep', value: 'IFEP', text: 'IFEP' },
  { key: 'eo', value: 'EO', text: 'EO' },
  { key: 'tbd', value: 'TBD', text: 'TBD' },
];
