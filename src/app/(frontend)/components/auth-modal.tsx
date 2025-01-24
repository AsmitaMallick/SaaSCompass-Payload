'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSession, signIn } from "next-auth/react"

export function AuthModal() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleAuthTrigger = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-auth-trigger]')) {
        setOpen(true)
      }
    }

    document.addEventListener('click', handleAuthTrigger)
    return () => document.removeEventListener('click', handleAuthTrigger)
  }, [])

  const handleSignIn = (provider: 'github' | 'google') => {
    signIn(provider)
    setOpen(false)
  }

  if (session) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A2027] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Sign In</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            onClick={() => handleSignIn('github')} 
            className="w-full bg-gray-800 hover:bg-gray-700 text-white"
          >
            Sign in with GitHub
          </Button>
          <Button 
            onClick={() => handleSignIn('google')} 
            className="w-full bg-gray-800 hover:bg-gray-700 text-white"
          >
            Sign in with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}