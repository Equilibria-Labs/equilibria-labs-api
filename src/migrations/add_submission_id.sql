-- Add submission_id column to dialogues table as NOT NULL since all new submissions will have this
ALTER TABLE dialogues ADD COLUMN submission_id UUID NOT NULL;

-- Add an index on submission_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_dialogues_submission_id ON dialogues(submission_id);

-- Add a composite index on dialogue_id and submission_id for faster lookups when filtering by both
CREATE INDEX IF NOT EXISTS idx_dialogues_dialogue_submission ON dialogues(dialogue_id, submission_id);

-- Populate existing rows with random UUIDs as submission_id
UPDATE dialogues SET submission_id = gen_random_uuid() WHERE submission_id IS NULL;

-- Eventually, you might want to make submission_id NOT NULL after migration is complete
-- ALTER TABLE dialogues ALTER COLUMN submission_id SET NOT NULL; 