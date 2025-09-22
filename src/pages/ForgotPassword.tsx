import { useState } from 'react'
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { apiFetch } from '@/lib/api'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess('')
        
        try {
            // Basic validation
            if (!email) {
                throw new Error('Please enter your email address')
            }
            
            if (!email.includes('@')) {
                throw new Error('Please enter a valid email address')
            }

            // Call API to send password reset email
            await apiFetch('/auth/forgot-password', {
                method: 'POST',
                body: { email }
            })
            
            setSuccess('Password reset email sent! Check your inbox.')
            setResendTimer(60) // Start 60-second cooldown
            
            // Start countdown timer
            const timer = setInterval(() => {
                setResendTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send reset email. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setEmail(value)
        if (error) {
            setError('')
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Back to Login */}
                <Link
                    to="/login"
                    className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors duration-200"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Login
                </Link>

                {/* Forgot Password Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-8 text-slate-100">
                    {/* Logo and Title */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-3">
                                <div className="w-6 h-6 bg-slate-900 rounded-sm"></div>
                            </div>
                            <span className="text-2xl font-bold text-white">HR Pro</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                        <p className="text-slate-300">Enter your email to receive a password reset link</p>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                            <span className="text-red-200 text-sm">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-900/30 border border-green-800 rounded-lg flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                            <span className="text-green-200 text-sm">{success}</span>
                        </div>
                    )}

                    {/* Forgot Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 bg-slate-900 text-slate-100 placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || resendTimer > 0}
                            className="w-full bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-60 font-semibold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center shadow"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mr-2"></div>
                                    Sending...
                                </>
                            ) : resendTimer > 0 ? (
                                `Resend in ${resendTimer}s`
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-slate-300 hover:text-white font-medium text-sm"
                        >
                            Remember your password? Sign in
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-slate-500 text-xs">
                    <p>© 2024 HR Pro. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

