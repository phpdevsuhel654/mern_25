import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    // ✅ Frontend validation
    if (!name.trim() || !email.trim() || password.length < 6) {
      toast.error('Please fill all fields (password min 6 chars)');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
      });

      localStorage.setItem("user", JSON.stringify(data));
      toast.success('Registration successful!');
      navigate("/chat");
    } catch (error) {
      console.error('Full error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

        <input 
          className="input w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" 
          placeholder="Full Name" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input 
          className="input mt-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" 
          placeholder="Email" 
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input 
          className="input mt-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" 
          type="password" 
          placeholder="Password (min 6 chars)" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button 
          onClick={submit} 
          disabled={loading}
          className="btn mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
}
