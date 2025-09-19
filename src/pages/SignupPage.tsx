import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { apiFetch } from '@/lib/api'
import { useToast } from '@/components/ToastProvider'
import OnboardingStepper from '@/components/OnboardingStepper'

const SignupPage = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [numEmployees, setNumEmployees] = useState('')
  const [industry, setIndustry] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyDomain, setCompanyDomain] = useState('')
  const [companySize, setCompanySize] = useState('Small')
  const [subscriptionPlan, setSubscriptionPlan] = useState('Premium')
  const [subscriptionStatus] = useState('active')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [maxStorageGb, setMaxStorageGb] = useState('100')
  const [role, setRole] = useState('ADMIN')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { notify } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await apiFetch('/api/auth/signup', {
        body: {
          email,
          password,
          firstName,
          lastName,
          role,
        },
      })
      // Persist company payload for post-OTP creation
      const companyPayload = {
        name: companyName,
        domain: companyDomain,
        industry,
        companySize,
        subscriptionPlan,
        subscriptionStatus,
        billingCycle,
        maxEmployees: Number(numEmployees) || 0,
        maxStorageGb: Number(maxStorageGb) || 0,
      }
      sessionStorage.setItem('pending_company', JSON.stringify(companyPayload))
      notify('Signup successful. We sent you an OTP email', 'success')
      navigate('/verify-otp', { state: { email } })
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      notify(err.message || 'Signup failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-10">
      <div className="w-full max-w-xl">
        <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors duration-200">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="bg-slate-800 border border-slate-700 shadow-xl rounded-2xl p-8 text-slate-100">
        <OnboardingStepper currentStep={1} />
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-slate-900 rounded-sm"></div>
            </div>
            <span className="text-2xl font-bold text-white">HR Pro</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-300">Start your 15‑day free trial</p>
        </div>
        {error && (
          <div className="mb-4 rounded border border-red-800 bg-red-900/30 px-4 py-3 text-red-300">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pre-fill plan from PricingModal if available */}
          {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
          {(() => {
            try {
              const selected = sessionStorage.getItem('selected_plan')
              if (selected) {
                const obj = JSON.parse(selected)
                if (obj.subscriptionPlan) setSubscriptionPlan(obj.subscriptionPlan)
                if (obj.billingCycle) setBillingCycle(obj.billingCycle)
                if (obj.maxEmployees) setNumEmployees(String(obj.maxEmployees))
                if (obj.maxStorageGb) setMaxStorageGb(String(obj.maxStorageGb))
                sessionStorage.removeItem('selected_plan')
              }
            } catch {}
            return null
          })()}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">First Name</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Last Name</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Industry</label>
            <input value={industry} onChange={e => setIndustry(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Company Domain</label>
            <input value={companyDomain} onChange={e => setCompanyDomain(e.target.value)} placeholder="acme.com" required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Company Address</label>
            <input value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Phone Number</label>
            <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Company Name</label>
            <input value={companyName} onChange={e => setCompanyName(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Number of Employees</label>
            <input type="number" min={1} value={numEmployees} onChange={e => setNumEmployees(e.target.value)} required className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">Company Size</label>
              <select value={companySize} onChange={e => setCompanySize(e.target.value)} className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Billing Cycle</label>
              <select value={billingCycle} onChange={e => setBillingCycle(e.target.value)} className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">Subscription Plan</label>
              <select value={subscriptionPlan} onChange={e => setSubscriptionPlan(e.target.value)} className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Free</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Max Storage (GB)</label>
              <input type="number" min={1} value={maxStorageGb} onChange={e => setMaxStorageGb(e.target.value)} className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Your Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="ADMIN">Admin</option>
              <option value="HR">HR</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full inline-flex justify-center items-center rounded-full bg-white text-slate-900 px-4 py-3 font-semibold hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 shadow">
            {loading ? 'Starting…' : 'Start Free Trial'}
          </button>
        </form>
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Already have an account?</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link to="/login" className="text-white underline decoration-slate-500 hover:decoration-white font-medium">Log in</Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage


