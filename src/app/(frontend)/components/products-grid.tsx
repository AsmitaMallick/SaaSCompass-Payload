// // src/app/(frontend)/components/products-grid.tsx
// 'use client'

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { SaasProduct } from '@/types/product';

// export function ProductsGrid() {
//   const [products, setProducts] = useState<SaasProduct[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await fetch('/api/products');
//         const data = await response.json();
//         setProducts(data.docs((product: SaasProduct) => product.status === 'active'));
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="container py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="container py-12">
//       <h2 className="text-3xl font-bold text-white mb-8">Featured SaaS Products</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <Link 
//             key={product.id} 
//             href={`/products/${product.slug}`}
//             className="bg-[#1A2027] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
//           >
//             <div className="flex items-center gap-4 mb-4">
//               <div className="relative w-12 h-12">
//                 <Image
//                   src={product.logo.url}
//                   alt={product.logo.alt}
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-white">{product.title}</h3>
//                 <p className="text-gray-400">{product.category}</p>
//               </div>
//             </div>
//             <div className="text-gray-300 line-clamp-3">
//               {product.description}
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               {product.pricingTiers.slice(0, 1).map((tier, i) => (
//                 <span 
//                   key={i}
//                   className="text-sm bg-blue-500/10 text-blue-400 px-2 py-1 rounded"
//                 >
//                   From ${tier.price}/{tier.billing}
//                 </span>
//               ))}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default ProductsGrid;

'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SaasProduct } from '@/types/product';

export function ProductsGrid() {
  const [products, setProducts] = useState<SaasProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/saas-products');
        const data = await response.json();
        
        // Safely handle the data
        const productsList = data.docs || [];
        const activeProducts = productsList.filter((product: SaasProduct) => 
          product.status === 'active'
        );
        
        setProducts(activeProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center text-red-400">{error}</div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="container py-12">
        <div className="text-center text-gray-400">No products available</div>
      </div>
    );
  }

  return (
    <section className="container py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Featured SaaS Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.slug}`}
            className="bg-[#1A2027] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12">
                {product.logo?.url ? (
                  <Image
                    src={product.logo.url}
                    alt={product.logo?.alt || product.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 rounded-md flex items-center justify-center">
                    <span className="text-gray-400 text-xl">
                      {product.title?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                <p className="text-gray-400">{product.category}</p>
              </div>
            </div>
            <div className="text-gray-300 line-clamp-3">
              {product.description}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.pricingTiers?.slice(0, 1).map((tier, i) => (
                <span 
                  key={i}
                  className="text-sm bg-blue-500/10 text-blue-400 px-2 py-1 rounded"
                >
                  From ${tier.price}/{tier.billing}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ProductsGrid;