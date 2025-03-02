# Database Migrations

This directory contains SQL migration files for the Supabase database.

## How to Run Migrations

### Using the Supabase Dashboard

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of the migration file
5. Run the query

### Using the Supabase CLI

If you have the Supabase CLI installed, you can run migrations using:

```bash
supabase db push
```

## Migration Files

- `create_dialogues_table.sql`: Creates the dialogues table for storing user dialogue data

## Schema

### Dialogues Table

The dialogues table stores user dialogue data with the following schema:

- `id`: UUID, primary key
- `user_id`: UUID, foreign key to auth.users
- `dialogue_id`: TEXT, unique identifier for the dialogue
- `title`: TEXT, title of the dialogue
- `version`: TEXT, version of the dialogue
- `status`: TEXT, status of the dialogue (not_started, in_progress, complete, submitted)
- `answers`: JSONB, array of answers
- `score`: NUMERIC, optional score
- `submitted_at`: TIMESTAMP WITH TIME ZONE, when the dialogue was submitted
- `created_at`: TIMESTAMP WITH TIME ZONE, when the record was created
- `updated_at`: TIMESTAMP WITH TIME ZONE, when the record was last updated

The table has a unique constraint on (user_id, dialogue_id) to prevent duplicate dialogues for a user.

Row Level Security (RLS) is enabled to ensure users can only access their own dialogues. 