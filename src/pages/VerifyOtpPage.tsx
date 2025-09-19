import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiFetch } from '@/lib/api'
import OnboardingStepper from '@/components/OnboardingStepper'
import { useToast } from '@/components/ToastProvider'

const VerifyOtpPage = () => {
  const navigate = useNavigate()
  const location = useLocation() as { state?: { email?: string } }
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resending, setResending] = useState(false)
  const [info, setInfo] = useState<string | null>(null)
  const { notify } = useToast()

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    }
  }, [location.state])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email) {
      setError('Email is required')
      return
    }
    if (otp.length !== 6) {
      setError('Enter the 6-digit code')
      return
    }
    setLoading(true)
    try {
      const data = await apiFetch<{ token?: string }>('/api/auth/verify-otp', {
        body: { email, otp }
      })
      if (data?.token) {
        localStorage.setItem('auth_token', data.token)
        // If we have a pending company payload, create the company now
        const pending = sessionStorage.getItem('pending_company')
        if (pending) {
          try {
            const payload = JSON.parse(pending)
            await apiFetch('/api/companies', { body: payload, auth: true })
            sessionStorage.removeItem('pending_company')
          } catch {}
        }
      }
      notify('Email verified', 'success')
      navigate('/setup-password')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      notify(err.message || 'Verification failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    if (!email) return
    setError(null)
    setInfo(null)
    setResending(true)
    try {
      await apiFetch('/api/auth/resend-otp', {
        body: { email }
      })
      setInfo('A new OTP has been sent to your email')
      notify('OTP resent', 'success')
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP')
      notify(err.message || 'Failed to resend OTP', 'error')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-10">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 shadow-xl rounded-lg p-8 text-slate-100">
        <OnboardingStepper currentStep={2} />
        <h1 className="text-2xl font-semibold text-white mb-6">Verify your email</h1>
        {error && (
          <div className="mb-4 rounded border border-red-800 bg-red-900/30 px-4 py-3 text-red-300">{error}</div>
        )}
        {info && (
          <div className="mb-4 rounded border border-blue-800 bg-blue-900/30 px-4 py-3 text-blue-300">{info}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">6-digit OTP</label>
            <input inputMode="numeric" pattern="[0-9]*" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 tracking-widest text-center text-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full inline-flex justify-center items-center rounded-md bg-white text-slate-900 px-4 py-2 font-semibold hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
            {loading ? 'Verifying...' : 'Verify'}
          </button>
          <button type="button" onClick={handleResend} disabled={resending} className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-slate-600 text-slate-200 px-4 py-2 font-medium hover:bg-slate-700 disabled:opacity-50">
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyOtpPage


