# Dialogue Submissions Model

## Overview

The dialogue system is designed to support multiple submissions of the same dialogue type. Each user can complete the same assessment multiple times, with each completion stored as a unique submission with its own `submissionId`.

The `dialogueId` represents the type of dialogue (e.g., 'isi', 'psqi'), while the `submissionId` uniquely identifies each specific submission.

## System Design

### Database Schema

- The `dialogues` table has a `submission_id` column (UUID, NOT NULL)
- Indexes are created on `submission_id` and on the combination of `dialogue_id` and `submission_id` for performance

### Type Definitions

- The `Dialogue` type includes both a `dialogueId` field and a `submissionId` field
- The `submissionId` is required for all operations (create and update)

### API Routes

- `POST /api/dialogues`: Creates a new dialogue submission (requires submissionId)
- `GET /api/dialogues/type/:dialogueId`: Gets all submissions for a specific dialogue type
- `GET /api/dialogues/:dialogueId/:submissionId`: Gets a specific submission
- `PUT /api/dialogues/:dialogueId/:submissionId`: Updates a specific submission

### Frontend Components

- `SleepReport` component generates a unique `submissionId` for each submission
- `SleepSummary` component groups and displays submissions by dialogue type
- Local storage uses a compound key of dialogueId and submissionId

### useDialogue Hook

- `getDialogueSubmissions` function to fetch all submissions for a dialogue type
- All dialogues are created and updated with a submissionId

## How to Use

### Creating a New Dialogue Submission

```typescript
import { v4 as uuidv4 } from 'uuid';
import useDialogue from '@/hooks/useDialogue';

function MyComponent() {
  const { createDialogue } = useDialogue();
  
  const handleSubmit = async () => {
    const submissionId = uuidv4();
    const dialogue = {
      dialogueId: 'isi', // Type of dialogue
      submissionId,      // Unique ID for this submission
      title: 'ISI Assessment',
      // ... other dialogue properties
    };
    
    await createDialogue(dialogue);
  };
}
```

### Fetching All Submissions for a Dialogue Type

```typescript
import useDialogue from '@/hooks/useDialogue';

function MyComponent() {
  const { getDialogueSubmissions } = useDialogue();
  const { submissions, isLoading } = getDialogueSubmissions('isi');
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {submissions.map(submission => (
        <div key={submission.submissionId}>
          {/* Display submission */}
        </div>
      ))}
    </div>
  );
}
```

### Updating a Specific Submission

```typescript
import useDialogue from '@/hooks/useDialogue';

function MyComponent() {
  const { updateDialogue } = useDialogue();
  
  const handleUpdate = async (dialogue) => {
    // The submissionId is required for updating
    await updateDialogue(dialogue.dialogueId, dialogue);
  };
}
``` 