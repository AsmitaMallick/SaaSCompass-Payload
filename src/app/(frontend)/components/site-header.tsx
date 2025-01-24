'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0F1218]">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-white"></div>
            <span className="text-xl font-bold text-white">SaaSCompass</span>
          </Link>
          <div className="relative w-64">
            <Input 
              placeholder="Search" 
              className="bg-[#1A2027] border-gray-800"
            />
          </div>
        </div>
        <nav className="flex items-center space-x-8">
          <Link href="/compare" className="text-gray-400 hover:text-white transition-colors">
            Compare
          </Link>
          <Link href="/affiliate" className="text-gray-400 hover:text-white transition-colors">
            Affiliate
          </Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
            Community
          </Link>
          <div className="flex items-center gap-2">
            <Button className="bg-[#2B8EFF] hover:bg-[#2B8EFF]/90 text-white">
              Add a product
            </Button>
            <Button variant="outline" className="border-gray-800 text-gray-400 hover:bg-gray-800">
              For vendors
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
export default SiteHeader
