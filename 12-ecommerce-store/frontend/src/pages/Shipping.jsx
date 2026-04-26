import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem('shipping', JSON.stringify(form));
    navigate('/checkout');
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Shipping</h2>

      <input placeholder="Address" onChange={(e)=>setForm({...form, address:e.target.value})} />
      <input placeholder="City" onChange={(e)=>setForm({...form, city:e.target.value})} />
      <input placeholder="Postal Code" onChange={(e)=>setForm({...form, postalCode:e.target.value})} />
      <input placeholder="Country" onChange={(e)=>setForm({...form, country:e.target.value})} />

      <button type="submit">Continue</button>
    </form>
  );
};

export default Shipping;