import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../features/wishlist/wishlistSlice';

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  return (
    <div style={{ border: '1px solid #ddd', padding: 10 }}>
      <img src={product.images[0]} alt={product.name} width="150" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
	  <button onClick={() => dispatch(addToWishlist(product))}>
	    ❤️
	  </button>
      <Link to={`/product/${product._id}`}>View</Link>
    </div>
  );
};

export default ProductCard;