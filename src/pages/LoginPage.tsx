import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Basic validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields')
      }
      
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address')
      }

      // Simulate successful login
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => {
        navigate('/dashboard') // You can change this to your dashboard route
      }, 1000)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContactAdmin = () => {
    // You can implement this to open email client or contact form
    window.open('mailto:iamshemaleandre@gmail.com?subject=Login%20Issue%20-%20HR%20Pro', '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-8 text-slate-100">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-3">
                <div className="w-6 h-6 bg-slate-900 rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-white">HR Pro</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-300">Sign in to your HR Pro account</p>
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

          {/* Login Form */}
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-600 bg-slate-900 text-slate-100 placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-slate-600 bg-slate-900 text-slate-100 placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-slate-600 bg-slate-900 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-slate-300 hover:text-white font-medium"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-60 font-semibold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center shadow"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">Don't have an account?</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link
              to="/signup"
              className="text-white underline decoration-slate-500 hover:decoration-white font-medium"
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Contact Admin Section */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm mb-2">
            Having trouble signing in?
          </p>
          <button
            onClick={handleContactAdmin}
            className="text-slate-300 hover:text-white font-medium text-sm underline"
          >
            Contact Admin
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-xs">
          <p>© 2024 HR Pro. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
