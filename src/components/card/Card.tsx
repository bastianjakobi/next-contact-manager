import { User } from '@/model/user';
import sql from '@/utils/db';
import { TrashIcon } from '@heroicons/react/16/solid';
import { redirect } from 'next/navigation';
import React from 'react'

interface CardProps {
    title: string;
}

function Card(props: CardProps) {
    const { title } = props;

    return (
        <div className="px-4 py-2 bg-white shadow-sm rounded hover:bg-opacity-40 transition-all flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
        </div>
    )
}

export default Card