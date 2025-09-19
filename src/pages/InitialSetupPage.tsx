import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '@/lib/api'
import OnboardingStepper from '@/components/OnboardingStepper'
import { useToast } from '@/components/ToastProvider'

const InitialSetupPage = () => {
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { notify } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match')
      return
    }
    setLoading(true)
    try {
      await apiFetch('/api/auth/change-password', {
        body: { oldPassword, newPassword },
        auth: true,
      })
      setSuccess('Password updated successfully')
      notify('Password updated', 'success')
      setTimeout(() => navigate('/admin'), 800)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      notify(err.message || 'Password update failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-10">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 shadow-xl rounded-lg p-8 text-slate-100">
        <OnboardingStepper currentStep={3} />
        <h1 className="text-2xl font-semibold text-white mb-6">Set your password</h1>
        {error && (
          <div className="mb-4 rounded border border-red-800 bg-red-900/30 px-4 py-3 text-red-300">{error}</div>
        )}
        {success && (
          <div className="mb-4 rounded border border-green-800 bg-green-900/30 px-4 py-3 text-green-300">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">Old/Temporary Password</label>
            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">New Password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Confirm New Password</label>
            <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full inline-flex justify-center items-center rounded-md bg-white text-slate-900 px-4 py-2 font-semibold hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
            {loading ? 'Saving…' : 'Save Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default InitialSetupPage


