import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from 'src/payload.config'
import RefreshRouteOnSave  from '@/components/RefreshRouteOnSave'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  console.log("Attempting to fetch product with slug:", params.slug) // Debug log
  
  const payload = await getPayload({ config })

  try {
    const productsResponse = await payload.find({
      collection: 'saas-products',
      where: {
        slug: {
          equals: params.slug
        }
      },
      draft: true
    })

    console.log("Product response:", productsResponse) // Debug log

    if (!productsResponse?.docs?.[0]) {
      console.log("No product found") // Debug log
      return notFound()
    }

    const product = productsResponse.docs[0]

    return (
      <main className="min-h-screen p-8">
        <RefreshRouteOnSave />
        
        <div className="max-w-6xl mx-auto">
          {/* Product Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl text-gray-600">{product.description}</p>
          </div>

          {/* Logo */}
          {product.logo && (
            <div className="mb-8">
              <img 
                src={`${process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_SERVER_URL}${product.logo.url}`}
                alt={product.title} 
                className="h-24 object-contain"
              />
            </div>
          )}

          {/* Category */}
          <div className="mb-8">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Pricing Tiers */}
          {product.pricingTiers && product.pricingTiers.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Pricing Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.pricingTiers.map((tier: any, index: number) => (
                  <div key={index} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-3xl font-bold mb-4">${tier.price} <span className="text-sm text-gray-600">/{tier.billing}</span></p>
                    {tier.features && (
                      <ul className="space-y-3">
                        {tier.features.map((feature: any, fIndex: number) => (
                          <li key={fIndex} className="flex items-center">
                            <span className="mr-2">✓</span>
                            {feature.feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots */}
          {product.screenshots && product.screenshots.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.screenshots.map((screenshot: any, index: number) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img 
                      src={`${process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_SERVER_URL}${screenshot.image.url}`}
                      alt={screenshot.caption || `Screenshot ${index + 1}`}
                      className="w-full h-auto"
                    />
                    {screenshot.caption && (
                      <p className="text-sm text-gray-600 mt-2">{screenshot.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Requirements */}
          {product.technicalRequirements && product.technicalRequirements.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Technical Requirements</h2>
              <ul className="space-y-3">
                {product.technicalRequirements.map((req: any, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {req.requirement}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Integrations */}
          {product.integrations && product.integrations.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Integrations</h2>
              <div className="flex flex-wrap gap-3">
                {product.integrations.map((integration: any, index: number) => (
                  <span key={index} className="bg-gray-100 px-4 py-2 rounded-full">
                    {integration.integration}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Additional Info */}
          <div className="text-sm text-gray-600">
            {product.version && (
              <p>Version: {product.version}</p>
            )}
            {product.featuredOn && (
              <p>Featured: {new Date(product.featuredOn).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return notFound()
  }
}