import jwt from 'jsonwebtoken';

// 1. Pulling the 'Secret Stamp' from the vault (.env)
const JWT_SECRET = process.env.JWT_SECRET!; 

// 2. This function 'prints' the ID Card
export function createToken(payload: object) {
  // jwt.sign takes the user data, mixes it with the secret, 
  // and creates a long encrypted string.
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });//1h,1d,1m but accordingly change the cookie time also 
}

// 3. This function 'checks' if the ID Card is fake
export function verifyToken(token: string) {
  // If someone changed a single letter in the token, 
  // this will throw an error.
  return jwt.verify(token, JWT_SECRET);//The secret is NEVER inside the token, and it is NEVER passed alongside the token.The secret stays only on your server, hidden in your .env file. Think of it like a wax seal stamp used by a King to seal a letter.JWT is not encrypted, only encoded(The Messenger can read the message, but can't change it without breaking the seal(assume a king delievering a message with a unique seal))
}