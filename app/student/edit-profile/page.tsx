"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // We can pre-fill data by fetching from an API or we could have passed it via props
    // Let's create an effect to fetch current profile details
    useEffect(() => {
        async function fetchProfile() {
            try {
                // We'll use the same API for fetching or just call the student layout data?
                // Actually, let's just use the current layout data indirectly if we can,
                // but since it's a client component, we'll just check if we can fetch it.
                // Or better: let's fetch it from a new api/student/profile endpoint.
                const res = await fetch("/api/auth/me"); // Assuming this exists or create it
                if (res.ok) {
                    const data = await res.json();
                    setFormData(prev => ({
                        ...prev,
                        name: data.name || "",
                        email: data.email || ""
                    }));
                }
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch profile info:", err);
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validation
        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage({ text: "Passwords do not match!", type: 'error' });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/student/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password || undefined
                })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage({ text: data.message, type: 'success' });
                // Reset password fields
                setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
                setTimeout(() => {
                    router.refresh(); // Refresh navbar data too
                    router.push("/student/profile");
                }, 1500);
            } else {
                setMessage({ text: data.message || "Failed to update profile", type: 'error' });
            }
        } catch (err) {
            setMessage({ text: "A network error occurred.", type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-2xl mx-auto mt-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-[#201E43] tracking-tight text-center">
                        Edit Profile, <span className="text-indigo-600 font-black">{formData.name}</span> ✏️
                    </h1>
                    <p className="text-slate-500 font-medium mt-2 text-center">
                        Update your academic profile information below.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden p-8 lg:p-12">
                    {message && (
                        <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
                            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                        }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'} text-white`}>
                                {message.type === 'success' ? '✓' : '!'}
                            </div>
                            <p className="text-sm font-bold">{message.text}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <InputField 
                                label="Full Name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Enter your full name" 
                                required
                            />
                            <InputField 
                                label="Email Address" 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="Enter your official email" 
                                required
                            />
                            
                            <hr className="my-2 border-slate-50" />
                            
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Security Update</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InputField 
                                        label="New Password" 
                                        type="password" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        placeholder="Min. 6 chars (Optional)" 
                                    />
                                    <InputField 
                                        label="Confirm Password" 
                                        type="password" 
                                        name="confirmPassword" 
                                        value={formData.confirmPassword} 
                                        onChange={handleChange} 
                                        placeholder="Repeat new password" 
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 italic pl-1 leading-relaxed">
                                    * Leave password fields empty to keep your current password.
                                </p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all duration-300 ${
                                    submitting 
                                    ? 'bg-slate-400 cursor-not-allowed' 
                                    : 'bg-[#201E43] hover:bg-black hover:shadow-xl hover:-translate-y-1 shadow-indigo-900/20 active:scale-95'
                                }`}
                            >
                                {submitting ? "Saving Changes..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={() => router.push("/student/profile")}
                        className="text-sm font-bold text-slate-400 hover:text-[#201E43] transition-colors"
                    >
                        ← Back to Profile
                    </button>
                </div>
            </main>
        </div>
    );
}

function InputField({ label, name, value, onChange, placeholder, type = "text", required = false }: any) {
    return (
        <div className="space-y-2 group">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-[#201E43] font-bold text-sm outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.05)] placeholder:text-slate-300"
            />
        </div>
    );
}
