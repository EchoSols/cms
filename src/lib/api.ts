const DEFAULT_BASE_URL = 'https://hrms-api-gateway-v2.onrender.com'

export const API_BASE_URL = (import.meta as any)?.env?.VITE_API_BASE_URL || DEFAULT_BASE_URL

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  auth?: boolean
}

export async function apiFetch<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  if (options.auth) {
    const token = localStorage.getItem('auth_token')
    if (token) headers['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(url, {
    method: options.method || 'POST',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed: ${res.status}`)
  }
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return res.json() as Promise<T>
  }
  // @ts-expect-error allow string return
  return res.text()
}


