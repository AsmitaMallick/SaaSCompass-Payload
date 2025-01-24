'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useSession } from "next-auth/react"
import Link from 'next/link'

export function HeroSection() {
  const { data: session } = useSession()

  return (
    <section className="container py-20 md:py-32">
      <div className="max-w-[800px] mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1]">
          Discover the best SaaS tools for your startup
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-[600px] mx-auto">
          AI-powered matching, personalized recommendations, and expert guidance in a single platform!
        </p>
        <div className="max-w-[600px] mx-auto flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Type your startup idea........." 
              className="w-full pl-10 py-6 bg-[#1A2027] border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="flex gap-2">
            {session ? (
              <Link 
                href="/dashboard" 
                className="bg-[#2B8EFF] hover:bg-[#2B8EFF]/90 text-white py-6 px-8 text-base inline-flex items-center rounded-md"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Button 
                data-auth-trigger 
                className="bg-[#2B8EFF] hover:bg-[#2B8EFF]/90 text-white py-6 px-8 text-base"
              >
                Get Started
              </Button>
            )}
            {/* <Link 
              href="/admin" 
              className="bg-gray-700 hover:bg-gray-600 text-white py-6 px-8 text-base inline-flex items-center rounded-md transition-colors"
            >
              Admin Panel
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection