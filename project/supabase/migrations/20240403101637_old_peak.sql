/*
  # Create ESG data table

  1. New Tables
    - `esg_data`
      - `id` (uuid, primary key)
      - `filename` (text)
      - `processed_at` (timestamp)
      - `status` (text)
      - `size` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `esg_data` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS esg_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  processed_at timestamptz NOT NULL,
  status text NOT NULL,
  size integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE esg_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON esg_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert own data"
  ON esg_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);