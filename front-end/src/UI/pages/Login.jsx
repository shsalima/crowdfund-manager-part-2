import { Link } from 'react-router';
import LoginForm from '../components/auth/LoginForm';


export default function Login() {
    return (
        <div className="min-h-screen bg-[#0b0c0e] text-white flex flex-col items-center justify-center p-4 font-sans">
            <div className="flex flex-col items-center mb-8">
                <div className="bg-white text-black w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-xl font-bold">$</span>
                </div>
                <h1 className="text-2xl font-bold tracking-wide">CROWDFLOW</h1>
                <p className="text-zinc-500 text-sm mt-2">Sign in to manage your campaigns</p>
            </div>

            <div className="w-full max-w-[440px] bg-[#111214]/40 border border-zinc-800/80 rounded-2xl p-8 backdrop-blur-sm">
                <LoginForm />

                <div className="text-center mt-6 text-sm text-zinc-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-white font-medium hover:underline">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}