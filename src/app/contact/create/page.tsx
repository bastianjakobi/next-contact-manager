import UserForm from '@/components/UserForm/UserForm';
import { User } from '@/model/user';
import sql from '@/utils/db'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

function CreateUserPage() {
    const insertUser = async (data: FormData) => {
        "use server";
        const name = data.get('name') as string;
        const phone = data.get('phone') as string;
        const email = data.get('email') as string;
        const notes = data.get('notes') as string;
        const address = data.get('address') as string;

        const [createdUser] = await sql<User[]>`
            INSERT INTO users (name, phone, email, notes, address) VALUES (${name}, ${phone}, ${email}, ${notes}, ${address}) RETURNING *;
        `;
        revalidatePath('/');
        redirect(`/contact/${createdUser.id}`);
    }
    return (
        <div>
            <h1 className='text-xl font-semibold text-slate-700 mb-3'>Create Contact</h1>
            <UserForm formAction={insertUser} />
        </div >
    )
}

export default CreateUserPage