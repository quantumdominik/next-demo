import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        // Check if user already exists
        const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;
        if (existingUser.rows.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        const result = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email
    `;

        const newUser = result.rows[0];

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}