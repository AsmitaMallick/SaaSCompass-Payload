// src/app/api/products/route.ts
import { getPayloadClient } from "@/lib/payload";
import { NextResponse } from "next/server";
import { config } from "process";

export async function GET() {
  try {
    const payload = await getPayloadClient({ config });
    
    const products = await payload.find({
      collection: 'saas-products',
      depth: 2,
      sort: '-featuredOn',
      where: {
        status: {
          equals: 'active'
        }
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}