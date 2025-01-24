import { useLivePreview } from '@payloadcms/live-preview-react';

const SaasProductsPreview = () => {
 interface Product {
   id: string;
   title: string;
   description: string;
   // Add other product properties here
 }

 const { data, isLoading } = useLivePreview<Product[]>({
   apiRoute: '/api/saas-products',
   initialData: [],
   serverURL: 'http://localhost:3000',
 });

 if (isLoading) {
   return <div>Loading...</div>;
 }

 if (!data) {
   return <div>Error: Failed to load data</div>;
 }

 return (
   <div>
     {data.map((product) => (
       <div key={product.id}>
         <h2>{product.title}</h2>
         <p>{product.description}</p>
         {/* Render other product details */}
       </div>
     ))}
   </div>
 );
};

export default SaasProductsPreview;