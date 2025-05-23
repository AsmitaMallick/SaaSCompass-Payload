// // app/api/products/[id]/preview/route.ts

// import { NextResponse } from 'next/server'
// import { db } from '@/lib/db'  // Adjust based on your database setup

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = params.id

//     // Fetch the product data from your database
//     const product = await db.saasProducts.findUnique({
//       where: {
//         id: id
//       }
//     })

//     if (!product) {
//       return new NextResponse('Product not found', { status: 404 })
//     }

//     return NextResponse.json(product)
//   } catch (error) {
//     console.error('Preview error:', error)
//     return new NextResponse('Internal Server Error', { status: 500 })
//   }
// }
