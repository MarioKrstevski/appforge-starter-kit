'use client'

import { useState, useCallback } from 'react'
import type { ActionState } from '@/types'

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
}

export function useApi<T = unknown>() {
  const [state, setState] = useState<ActionState>({ status: 'idle' })
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(async (url: string, options: FetchOptions = {}) => {
    setState({ status: 'loading' })
    try {
      const res = await fetch(url, {
        method: options.method ?? 'GET',
        headers: { 'Content-Type': 'application/json' },
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
      })

      const json = await res.json()

      if (!res.ok) {
        setState({ status: 'error', message: json.error ?? 'Something went wrong' })
        return null
      }

      setData(json.data ?? json)
      setState({ status: 'success' })
      return json.data ?? json
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error'
      setState({ status: 'error', message })
      return null
    }
  }, [])

  const reset = useCallback(() => {
    setState({ status: 'idle' })
    setData(null)
  }, [])

  return { state, data, execute, reset }
}
