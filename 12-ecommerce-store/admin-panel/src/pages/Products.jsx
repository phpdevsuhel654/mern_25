import { useEffect, useState } from 'react';
import API from '../api/axios';
import ProductModal from '../components/ProductModal';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/productApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (data) => {
    if (selected) {
      await updateProduct(selected._id, data);
    } else {
      await createProduct(data);
    }

    setModalOpen(false);
    setSelected(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Products</h1>

        <button
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded-xl shadow">
            <img src={p.images[0]} className="h-32 w-full object-cover rounded" />

            <h3 className="mt-2 font-semibold">{p.name}</h3>
            <p>₹{p.price}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setSelected(p);
                  setModalOpen(true);
                }}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        product={selected}
      />
    </div>
  );
};

export default Products;