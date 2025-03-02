-- Create dialogues table
CREATE TABLE IF NOT EXISTS dialogues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dialogue_id TEXT NOT NULL,
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'complete', 'submitted')),
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  score NUMERIC,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, dialogue_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS dialogues_user_id_idx ON dialogues (user_id);
CREATE INDEX IF NOT EXISTS dialogues_dialogue_id_idx ON dialogues (dialogue_id);

-- Add RLS (Row Level Security) policies
ALTER TABLE dialogues ENABLE ROW LEVEL SECURITY;

-- Policy for users to only see their own dialogues
CREATE POLICY dialogues_user_isolation_policy ON dialogues
  FOR ALL
  USING (auth.uid() = user_id);

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON dialogues TO authenticated;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_dialogues_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function
CREATE TRIGGER update_dialogues_updated_at_trigger
BEFORE UPDATE ON dialogues
FOR EACH ROW
EXECUTE FUNCTION update_dialogues_updated_at(); 