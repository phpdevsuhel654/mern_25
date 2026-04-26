import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <div>
      <h1>My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlistItems.map((item) => (
          <div key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
            <img src={item.images[0]} width="100" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <Link to={`/product/${item._id}`}>View</Link>

            <button onClick={() => dispatch(removeFromWishlist(item._id))}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;