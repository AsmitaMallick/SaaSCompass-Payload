import Link from 'next/link'
import { getPayload } from 'payload'
import config from 'src/payload.config'

export default async function ProductsPage() {
  const payload = await getPayload({ config })
  
  try {
    const products = await payload.find({
      collection: 'saas-products',
      where: {
        status: {
          equals: 'active',
        },
      },
      depth: 1,
    })

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">SaaS Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.docs.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.slug}`}
              className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              {/* {product.logo && (
                <img 
                  src={product.logo.url} 
                  alt={`${product.title} logo`}
                  className="h-12 mb-4 object-contain"
                />
              )} */}
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {product.category}
              </span>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }
}