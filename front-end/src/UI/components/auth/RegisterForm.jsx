import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { MoveRight } from 'lucide-react';
import { clearError, registerUser } from '../../../store/slices/authSlice';

export default function RegisterForm() {
    const [userData, setUserData] = useState({ name: '', email: '', password: '', role: 'project owner' });
    const [agree, setAgree] = useState(false);
    const [localError, setLocalError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) navigate('/dashboard');
        return () => { dispatch(clearError()); };
    }, [token, navigate, dispatch]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError('');


        const { name, email, password,role } = userData;
        dispatch(registerUser({ name, email, password, role }));
    };
    console.log(userData)
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {(error || localError) && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs text-center">
                    {localError || error}
                </div>
            )}

            <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                <input type="text" name="name" value={userData.name} onChange={handleChange} required placeholder="John Doe" className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all" />
            </div>

            <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Password</label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} required placeholder="••••••••" className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all" />
                </div>
             
            </div>

            
       

            <button type="submit" disabled={loading} className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-500 text-[#0b0c0e] font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200">
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <MoveRight size={16} />}
            </button>
        </form>
    );
}