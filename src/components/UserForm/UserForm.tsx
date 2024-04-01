import React from 'react'
interface UserFormProps {
    formAction: (data: FormData) => Promise<void>
    initialValues?: {
        name: string
        phone: string
        email?: string
        address?: string
        notes?: string
    }
}
function UserForm({ formAction, initialValues }: UserFormProps) {
    return (
        <form className='flex flex-col gap-4' action={formAction}>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name" className='text-slate-700'>Name (Required)</label>
                <input type="text" name="name" placeholder="John Doe" className='border border-slate-300 rounded-md p-2' required defaultValue={initialValues?.name || ''} />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="phone" className='text-slate-700'>Phone (Required)</label>
                <input type="tel" name="phone" placeholder="555-555-5555" className='border border-slate-300 rounded-md p-2' required defaultValue={initialValues?.phone || ''} />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='text-slate-700'>E-Mail</label>
                <input type="email" name="email" placeholder="test@test.com" className='border border-slate-300 rounded-md p-2' defaultValue={initialValues?.email || ''} />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='address' className='text-slate-700'>Address</label>
                <input type='text' name='address' placeholder='My address' className='border border-slate-300 rounded-md p-2' defaultValue={initialValues?.address || ''} />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="notes" className='text-slate-700'>Notes</label>
                <textarea name="notes" placeholder="My notes" className='border border-slate-300 rounded-md p-2' defaultValue={initialValues?.notes || ''} />
            </div>
            <div className='flex gap-2'>
                <button type="reset" className='bg-slate-300 text-slate-800 px-4 py-2 rounded-md'>Reset</button>
                <button type="submit" className='bg-teal-900 text-white px-4 py-2 rounded-md'>{initialValues ? 'Save' : 'Create'}</button>
            </div>
        </form>
    )
}

export default UserForm