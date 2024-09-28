import type { Product } from '~/types/product';
import formatPrice from '~/lib/formatPrice';
import truncateString from '~/lib/truncateString';

interface ProductCardProps extends Product {
  index: number;
}

const DESCRIPTION_MAX_LENGTH = 100;

export default function productCard({
  id,
  name,
  description,
  image,
  price,
  index,
}: ProductCardProps) {
  const formattedPrice = formatPrice(price);
  const formattedDescription = truncateString(description, DESCRIPTION_MAX_LENGTH);

  return (
    <div className="p-4 flex flex-col border border-slate-500 rounded shadow-md text-slate-900 bg-slate-400">
      <img 
        src={image} 
        alt={name} 
        className="w-full h64 object-cover"
        loading={index < 3 ? 'eager' : 'lazy'}
      />
      <h4 className="text-lg font-bold mt-2">{name}</h4>
      <p className="text-sm mb-4">{formattedDescription}</p>
      <p className="font-bold mt-auto">{formattedPrice}</p>
      <button className="mt-4 px-4 py-2 bg-pink-800 text-white rounded hover:bg-pink-900">
        Add to cart
      </button>
    </div>
  )
}
