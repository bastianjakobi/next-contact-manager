"use client";
import { User } from '@/model/user';
import sql from '@/utils/db';
import { TrashIcon } from '@heroicons/react/16/solid';
import { redirect } from 'next/navigation';
import React from 'react'
interface deleteButtonProps {
    contactID: string
    deleteContact: () => Promise<void>
}
async function DeleteButton(props: deleteButtonProps) {
    "use client";
    const { contactID, deleteContact } = props;
    return (
        <button onClick={() => deleteContact()} className='bg-red-500 text-white px-4 py-2 rounded-md flex gap-2 items-center justify-center'><TrashIcon className='w-6 h-6' /><span>Delete</span></button>
    )

}

export default DeleteButton