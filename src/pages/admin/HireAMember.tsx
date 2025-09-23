import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '@/lib/api'

const roles = ['Employee', 'Trainer', 'Manager', 'Admin', 'Auditor', 'HR'] as const
type Role = typeof roles[number]

const roleDesc: Record<Role, string> = {
    Employee: "This is a regular employee and if you don't find the role you want, you can just hire them as Employee with that position",
    Trainer: "This role is for those who will be training and helping out new employees or just updating the skills of existing employees",
    Manager: "This role is for those who will be managing a team of employees or department and will be responsible for their performance",
    Admin: "This role is for those who will be managing this entire platform for company just like you are doing right now",
    Auditor: "This role is for those who will be auditing the performance of employees, managers, Company documents like contracts, financial statements etc",
    HR: "This role is for those who will be managing the employees from hiring to firing and all the paperwork in between like contracts, payrolls, benefits etc"
}

const HireAMember = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [role, setRole] = useState<Role>('Employee')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess('')
        try {
            await apiFetch('/admin/hire-member', {
                method: 'POST',
                body: { email, role }
            })
            setSuccess('Hiring Email Sent Successfully')
            setEmail('')
            setRole('Employee')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to send hiring email. Please try again.')
        } finally {
            setIsLoading(false)
            setTimeout(() => {
                setSuccess('')
                setError('')
            }, 5000)
            setTimeout(() => {
                navigate('/admin')
            }, 1000)
        }
    }

    return (
        <div className='min-h-screen bg-slate-900 flex items-center justify-center p-4'>
            <div className='bg-slate-800 text-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col items-center'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Hire A Member</h1>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left: Role Cards */}
                        <div className="flex-1 flex flex-col justify-center">
                            <label className="block mb-2 font-semibold text-center md:text-left">Select Role</label>
                            <div className="flex flex-col gap-4">
                                {roles.map(r => (
                                    <button
                                        type="button"
                                        key={r}
                                        onClick={() => setRole(r)}
                                        className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all
                                            ${role === r
                                                ? 'bg-gray-600 border-gray-400 shadow-lg'
                                                : 'bg-slate-700 border-slate-600 hover:border-gray-400'}
                                        `}
                                    >
                                        <span className="font-semibold text-lg">{r}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Right: Email Input and Desc */}
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <label className="block mb-1 font-semibold">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded bg-slate-700 text-white mb-4"
                                    placeholder="Enter email"
                                />
                                {/* Description Bar */}
                                <div className="bg-slate-700 rounded p-3 min-h-[64px] border-l-4 border-gray-400 text-slate-200">
                                    {roleDesc[role]}
                                </div>
                            </div>
                            <div className="mt-6">
                                {error && <div className="text-red-400 mb-2">{error}</div>}
                                {success && <div className="text-green-400 mb-2">{success}</div>}
                                <button
                                    type="submit"
                                    className="w-full bg-white text-slate-900 font-semibold py-2 rounded hover:bg-gray-200 transition disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Send Hiring Email'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HireAMember