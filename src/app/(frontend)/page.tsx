'use client'

import  SiteHeader  from "./components/site-header"
import  HeroSection from "./components/hero-section"
import  FeatureCard from "./components/feature-card"
import { ProductsGrid } from './components/products-grid'
// import SaasProductsPreview from "./components/SaasPreview"
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F1218]">
      <SiteHeader />
      <HeroSection />
      <ProductsGrid />
      
      <section className="container py-20">
        <div className="space-y-4 max-w-[800px] mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            How it works
          </h2>
          <p className="text-gray-400 text-center text-lg">
            Whether you are looking for your first tool or need to replace an existing one, we will guide you through the process.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="AI-powered matching"
            description="We use machine learning to match you with the best tools for your needs."
            imageSrc="/placeholder.svg?height=300&width=400"
            imageAlt="AI Robot illustration"
          />
          <FeatureCard
            title="Personalized recommendations"
            description="Every recommendation is tailored to your startup's unique stage and goals."
            imageSrc="/placeholder.svg?height=300&width=400"
            imageAlt="Rocket launch illustration"
          />
          <FeatureCard
            title="Expert guidance"
            description="Our team of startup experts is here to help you navigate the SaaS landscape."
            imageSrc="/placeholder.svg?height=300&width=400"
            imageAlt="Light bulb illustration"
          />
        </div>
      </section>
    </div>
  )
}

