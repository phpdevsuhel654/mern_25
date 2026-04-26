import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={product.images[0]} width="200" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>
	  <button onClick={() => dispatch(addToCart(product))}>
	    Add to Cart
	  </button>
	  <button onClick={() => dispatch(addToWishlist(product))}>
		❤️ Add to Wishlist
	  </button>
    </div>
  );
};

export default ProductDetails;