import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { username, email, password } = Object.fromEntries(formData);
        if (isLogin) {
            login(username, password);
        } else {
            register(username, email, password);
        }
    };

    return (
        <main className="bg-[url('/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 w-175">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                        <h2>{isLogin ? 'Log In to Continue Your Job Journey' : 'Get Started with Resumind'}</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="gap-4!">
                        <div className="form-div">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" required />
                        </div>
                        {!isLogin && (
                            <div className="form-div">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" required />
                            </div>
                        )}
                        <div className="form-div">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" required />
                        </div>
                        <button type="submit" className="auth-button text-xl! mt-4">
                            {isLogin ? 'Log In' : 'Register'}
                        </button>
                    </form>
                    <p className="text-center text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-indigo-600 ml-2">
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </section>
            </div>
        </main>
    );
};

export default AuthPage;