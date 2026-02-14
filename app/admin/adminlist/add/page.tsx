import { AddAdminAction } from '@/app/action/AddAdminAction';
import React from 'react';
import Link from 'next/link';

export default function AddAdmin() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans pb-20 flex items-center justify-center p-6">
      {/* Background Blobs - matching the "liquid glass" theme from list pages */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
        <div className="absolute top-[5%] left-[10%] w-[30%] h-[30%] bg-[#201E43]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] right-[20%] w-[20%] h-[20%] bg-blue-200/30 rounded-full blur-3xl animate-ping opacity-20"></div>
      </div>

      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Premium Glass Card */}
      <div className="relative z-10 w-full max-w-xl group">
        {/* Decorative element for glassmorphism layer */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-white/40 backdrop-blur-[30px] rounded-[2.5rem] border border-white/60 shadow-2xl shadow-slate-200/50 p-8 md:p-12">

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-[#201E43] tracking-tight mb-2">Add New Faculty</h1>
            <p className="text-[#201E43]/60 font-medium">Create a new faculty record in the system</p>
          </div>

          {/* Form */}
          <form action={AddAdminAction} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="hidden" name="role" value="ADMIN" />

              {/* Admin Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">
                  Admin Name
                </label>
                <input
                  type="text"
                  name="AdminName"
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-bold text-[#201E43] placeholder:text-[#201E43]/30 focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">
                  Password</label>
                <input
                  type="password"
                  name="Password"
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-bold text-[#201E43] placeholder:text-[#201E43]/30 focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="Email"
                  placeholder="student@college.edu"
                  className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-bold text-[#201E43] placeholder:text-[#201E43]/30 focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="9012345678" pattern="[0-9]{10}" maxLength={10} 
                  className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-bold text-[#201E43] placeholder:text-[#201E43]/30 focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">
                Description
              </label>
              <textarea
                name="Description"
                placeholder="Briefly describe the student (optional)"
                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-bold text-[#201E43] placeholder:text-[#201E43]/30 focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm resize-none"
                rows={3}
              />
            </div>

            {/* Password */}
            {/* <div className="space-y-2">
              <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">
                Password
              </label>
              <input
                type="password"
                name="Password"
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-bold text-[#201E43] placeholder:text-[#201E43]/30 focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                required
              />
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-5 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-[#201E43]/20 group/btn mt-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform duration-300">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Admin
            </button>
          </form>

          {/* Back Action */}
          <div className="mt-10 text-center">
            <Link
              href="/admin/adminlist"
              className="inline-flex items-center gap-2 text-[10px] font-black text-[#201E43]/40 uppercase tracking-widest hover:text-[#201E43] transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Admin List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
