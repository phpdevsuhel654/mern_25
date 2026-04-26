import { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSubmit, product }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    images: [''],
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">
          {product ? 'Edit' : 'Add'} Product
        </h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({...form, price: e.target.value})}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({...form, stock: e.target.value})}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="Image URL"
          value={form.images[0]}
          onChange={(e) =>
            setForm({...form, images: [e.target.value]})
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-3 py-1 bg-black text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;