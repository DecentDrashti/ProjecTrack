"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password, role }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        // 🔁 Redirect based on role returned by API
        router.push(`/${data.role}`);
        router.refresh();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#EDF0F5] relative overflow-hidden">
            {/* ... Your Glassmorphism CSS/HTML Background ... */}
            {/* Liquid Background */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-40" style={{ filter: 'url(#goo)' }}>
                <div className="absolute top-[10%] left-[20%] w-[35%] h-[35%] bg-[#201E43] rounded-full mix-blend-multiply blur-2xl animate-flow-liquid"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-400 rounded-full mix-blend-multiply blur-2xl animate-flow-liquid-reverse"></div>
                <div className="absolute top-[40%] right-[30%] w-[25%] h-[25%] bg-blue-300 rounded-full mix-blend-multiply blur-2xl animate-flow-liquid-slow"></div>
            </div>

            <svg className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>


            <div className="w-full max-w-sm bg-white/20 backdrop-blur-[40px] p-8 rounded-[3.5rem] shadow-xl border border-white/50 relative z-10">
                <div className="text-center mb-6 relative">
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border border-white/40 transform transition-all duration-500 group-hover:scale-105">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/003/693/837/large_2x/p-letter-logo-icon-for-business-and-company-vector.jpg"
                                alt="ProjectTrack Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-[#201E43] tracking-tight mb-2">ProjecTrack</h2>
                    <p className="text-[#201E43]/60 italic font-bold text-[20px] scale-90">
                        "Success is the sum of small projects."
                    </p>
                </div>

                {/* Role Selector */}
                <div className="flex bg-white/10 backdrop-blur-3xl rounded-2xl p-1 mb-6 border border-white/10 shadow-inner overflow-hidden">
                    {(['student', 'faculty', 'admin'] as const).map((r) => (
                        <button
                            key={r}
                            onClick={() => { setRole(r); setIdentifier(''); }}
                            className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 relative overflow-hidden ${role === r ? 'text-white' : 'text-[#201E43]/60 hover:text-[#201E43]'
                                }`}
                        >
                            {role === r && <div className="absolute inset-0 bg-[#201E43] animate-fade-in"></div>}
                            <span className="relative z-10">{r}</span>
                        </button>
                    ))}
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-widest ml-2">
                            {role === 'student' ? 'Enrollment' : 'Email'}
                        </label>
                        <input
                            type={role === 'student' ? 'text' : 'email'}
                            className="w-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-3.5 text-xs font-bold text-[#201E43] outline-none focus:bg-white/40 transition-all duration-500 placeholder:text-[#201E43]/20" placeholder={role === 'student' ? '2021BCS042' : 'name@college.edu'}
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-widest ml-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-3.5 text-xs font-bold text-[#201E43] outline-none focus:bg-white/40 transition-all duration-500 placeholder:text-[#201E43]/20" placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest">
                        Authenticate
                    </button>
                </form>
            </div>
            <style jsx global>{`
                 @keyframes flow-liquid {
                     0%, 100% { transform: translate(0, 0) scale(1); }
                     33% { transform: translate(10%, -5%) scale(1.1); }
                     66% { transform: translate(-5%, 10%) scale(0.9); }
                 }
                 @keyframes flow-liquid-reverse {
                     0%, 100% { transform: translate(0, 0) scale(1); }
                     33% { transform: translate(-10%, 5%) scale(0.9); }
                     66% { transform: translate(5%, -10%) scale(1.1); }
                 }
                 @keyframes molten-shine {
                     0% { transform: translate(-100%, -100%) rotate(45deg); }
                     100% { transform: translate(100%, 100%) rotate(45deg); }
                 }
                 .animate-flow-liquid { animation: flow-liquid 20s ease-in-out infinite; }
                 .animate-flow-liquid-reverse { animation: flow-liquid-reverse 25s ease-in-out infinite; }
                 .animate-flow-liquid-slow { animation: flow-liquid 35s ease-in-out infinite reverse; }
                 .animate-molten-shine { animation: molten-shine 8s linear infinite; }
                 .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
                 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
             `}</style>

        </div>
    );
};

export default LoginPage;

