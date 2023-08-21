enum KeyPrefix {
  NOTES = 'notes',
  ISSUES = 'issues',
}

const convert2Key = (prefix: string, token: string) => `${prefix}-${token}`;

export const convert2NotesKey = (token: string) =>
  convert2Key(KeyPrefix.NOTES, token);
export const convert2IssuesKey = (token: string) =>
  convert2Key(KeyPrefix.ISSUES, token);
