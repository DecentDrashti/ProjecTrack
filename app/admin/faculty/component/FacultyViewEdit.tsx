"use client";
import React from 'react';
import Link from 'next/link';

interface Props {
    data: any;
    mode: 'view' | 'edit';
    action?: (formData: FormData) => void;
}

export default function FacultyViewEdit({ data, mode, action }: Props) {
    const isEdit = mode === 'edit';

    const DisplayField = ({ label, name, value, type = "text" }: any) => (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-[#201E43]/40 uppercase tracking-[0.2em] block ml-1">
                {label}
            </label>
            {isEdit ? (
                <input
                    name={name}
                    defaultValue={value}
                    type={type}
                    className="w-full px-5 py-4 bg-white/60 border border-indigo-200 rounded-2xl text-sm font-bold text-[#201E43] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
                />
            ) : (
                <div className="px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-bold text-[#201E43] shadow-sm">
                    {value || '—'}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-20 flex items-center justify-center p-6 bg-slate-50/50">
            {/* Background Blobs */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
                <div className="absolute top-[10%] left-[15%] w-[35%] h-[35%] bg-[#201E43]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[45%] h-[45%] bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
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

            <div className="relative z-10 w-full max-w-2xl group animate-in fade-in zoom-in duration-700">
                <form action={isEdit ? action : undefined} className="relative bg-white/40 backdrop-blur-[40px] rounded-[3rem] border border-white/60 shadow-2xl p-8 md:p-12">

                    {isEdit && <input type="hidden" name="StaffID" value={data.StaffID} />}

                    {/* Header */}
                    <div className="mb-12 text-center relative z-10">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#201E43] to-[#4338ca] text-white text-4xl font-black mb-8 shadow-2xl ring-8 ring-white/40 transform group-hover:scale-110 transition-transform duration-500">
                            {data?.StaffName?.charAt(0) || 'F'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[#201E43] tracking-tight mb-3">
                            {isEdit ? "Edit Faculty" : (data?.StaffName || 'Faculty Profile')}
                        </h1>
                        <p className="text-[#201E43]/40 font-bold uppercase tracking-[0.2em] text-[10px]">
                            Faculty Identification Card
                        </p>
                    </div>

                    {/* Faculty Details */}
                    {data ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <DisplayField label="Faculty ID" name="StaffID" value={data.StaffID} />
                            <DisplayField label="Role / Designation" name="role" value={data.role} />
                            <DisplayField label="Full Name" name="StaffName" value={data.StaffName} />
                            <DisplayField label="Email Address" name="Email" value={data.Email} />
                            <DisplayField label="Phone Number" name="Phone" value={data.Phone} />
                            <DisplayField label="Account Password" name="Password" value={data.Password} />

                            <div className="md:col-span-2">
                                <DisplayField label="About / Description" name="Description" value={data.Description} />
                            </div>

                            {!isEdit && (
                                <div className="md:col-span-2 grid grid-cols-2 gap-8 p-6 bg-white/30 rounded-[2rem] border border-white/40 mt-4">
                                    <DisplayField label="Registration Date" value={data.Created?.toLocaleString()} />
                                    <DisplayField label="Last Profile Update" value={data.Modified?.toLocaleString()} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-black text-[#201E43] mb-2">Faculty Not Found</h3>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-white/40 pt-10">
                        <Link href="/admin/faculty" className="group/btn relative px-8 py-4 bg-[#201E43] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                            Back to List
                        </Link>

                        {isEdit ? (
                            <button type="submit" className="group/btn relative px-8 py-4 bg-white/50 text-[#201E43] rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl overflow-hidden">
                                Save Changes
                            </button>
                        ) : (
                            <Link href={`/admin/faculty/${data.StaffID}/edit`} className="group/btn relative px-8 py-4 bg-white/50 text-[#201E43] rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl overflow-hidden">
                                Edit Profile
                            </Link>
                        )}
                    </div>
                </form>
            </div>

            <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
