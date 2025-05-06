/*
  # Update ESG data table policies

  1. Changes
    - Add public access policy for inserting data
    - Modify existing policies to be more permissive
    
  2. Security
    - Allow public inserts for file uploads
    - Maintain read restrictions to authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON esg_data;
DROP POLICY IF EXISTS "Users can insert own data" ON esg_data;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
  ON esg_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON esg_data
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);