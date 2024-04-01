import DeleteButton from '@/components/DeleteButton/DeleteButton';
import UserForm from '@/components/UserForm/UserForm';
import { User } from '@/model/user';
import sql from '@/utils/db';
import { EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/16/solid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

interface UserDetailPageProps {
    params: {
        contactID: string
    },
    searchParams: {
        edit: boolean
    }
}

async function UserDetailPage(props: UserDetailPageProps) {
    const { contactID } = props.params;
    const { edit } = props.searchParams;
    const [user] = await sql<User[]>`SELECT * FROM users WHERE id = ${contactID}`;
    const deleteContact = async () => {
        "use server";
        await sql<User[]>`DELETE FROM users WHERE id = ${contactID} RETURNING *;`;
        revalidatePath('/');
        redirect('/');
    }
    const editContact = async (data: FormData) => {
        "use server";
        const name = data.get('name') as string;
        const phone = data.get('phone') as string;
        const email = data.get('email') as string;
        const notes = data.get('notes') as string;
        const address = data.get('address') as string;

        await sql<User[]>`
            UPDATE users SET name = ${name}, phone = ${phone}, email = ${email}, notes = ${notes}, address = ${address} WHERE id = ${contactID};
        `;
        revalidatePath(`/contact/${contactID}`);
        revalidatePath('/');
        redirect(`/contact/${contactID}`);
    }
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2 flex-col items-center'>
                <div className="rounded-full p-3 bg-slate-200">
                    <UserIcon className="w-12 h-12 text-slate-500" />
                </div>
                <div className='text-center'>
                    <h2 className="text-lg font-semibold text-slate-700">{user.name}</h2>
                </div>
            </div>
            {
                edit ? (
                    <UserForm formAction={editContact} initialValues={user} />
                ) : (
                    <>
                        <div className='flex justify-center'>
                            <div className="flex gap-2">
                                <a href={`tel:${user.phone}`} className="bg-teal-900 text-white px-4 py-2 hover:bg-teal-700 transition-all rounded min-w-20 text-center flex gap-2 items-center"><PhoneIcon className='w-6 h-6' /><span>Call</span></a>
                                {
                                    user.email && <a href={`mailto:${user.email}`} className="bg-teal-900 text-white px-4 py-2 hover:bg-teal-700 transition-all rounded min-w-20 text-center flex gap-2 items-center"><EnvelopeIcon className='w-6 h-6' /><span>Email</span></a>
                                }
                            </div>
                        </div>
                        <div className='bg-white px-4 py-2 rounded-md'>
                            <p className='text-sm text-slate-500'>Phone</p>
                            <a href={`tel:${user.phone}`} className='text-teal-700 hover:text-teal-900 underline transition-all'>{user.phone}</a>
                        </div>
                        <div className='bg-white px-4 py-2 rounded-md'>
                            <p className='text-sm text-slate-500'>E-Mail</p>
                            {
                                user.email ? <a href={`mailto:${user.email}`} className='text-teal-700 hover:text-teal-900 underline transition-all'>{user.email}</a> : <p className='text-slate-700'>-</p>
                            }
                        </div>
                        <div className='bg-white px-4 py-2 rounded-md'>
                            <p className='text-sm text-slate-500'>Adress</p>
                            <p className='text-slate-700'>
                                {user.address || '-'}
                            </p>
                        </div>
                        <div className='bg-white px-4 py-2 rounded-md'>
                            <p className='text-sm text-slate-500'>Notes</p>
                            <p className='text-slate-700'>
                                {user.notes || '-'}
                            </p>
                        </div>
                        <DeleteButton contactID={contactID} deleteContact={deleteContact} />
                    </>
                )
            }
        </div>
    )
}

export default UserDetailPage