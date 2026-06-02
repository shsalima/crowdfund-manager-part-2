import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { MoveRight } from 'lucide-react';
import { clearError, loginUser } from '../../../store/slices/authSlice';

export default function LoginForm() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, error, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) navigate('/dashboard');
        return () => { dispatch(clearError()); };
    }, [token, navigate, dispatch]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credentials));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs text-center">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    placeholder="alex@project.com"
                    className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all"
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        Password
                    </label>
                    <a href="#" className="text-xs text-zinc-500 hover:text-white transition-all">Forgot?</a>
                </div>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-500 text-[#0b0c0e] font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
            >
                {loading ? 'Signing In...' : 'Sign In'}
                {!loading && <MoveRight size={16} />}
            </button>
        </form>
    );
}