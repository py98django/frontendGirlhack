import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Your MongoDB connection URI

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, name } = req.body;

  // Connect to MongoDB
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('discoApp');
  const usersCollection = db.collection('users');

  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    client.close();
    return res.status(409).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user
  await usersCollection.insertOne({
    email,
    password: hashedPassword,
    name,
  });

  client.close();
  res.status(201).json({ message: 'User created' });
}
