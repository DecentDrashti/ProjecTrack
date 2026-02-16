// components/StudentViewEdit.tsx
import React from 'react';
import Link from 'next/link';

interface Props {
  data: any;
  mode: 'view' | 'edit';
  action?: (formData: FormData) => void;
}

export default function StudentViewEdit({ data, mode, action }: Props) {
  const isEdit = mode === 'edit';

  // Reusable Field Logic
  const DisplayField = ({ label, name, value, type = "text" }: any) => (
    <div className="space-y-1">
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
    <div className="min-h-screen relative overflow-hidden font-sans pb-20 flex items-center justify-center p-6">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
        <div className="absolute top-[5%] left-[10%] w-[30%] h-[30%] bg-[#201E43]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl"></div>
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
        <form action={isEdit ? action : undefined} className="relative bg-white/40 backdrop-blur-[30px] rounded-[2.5rem] border border-white/60 shadow-2xl p-8 md:p-12">
          
          {isEdit && <input type="hidden" name="StudentID" value={data.StudentID} />}

          {/* Header */}
          <div className="mb-10 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#201E43] to-[#4338ca] text-white text-3xl font-black mb-6 shadow-xl ring-4 ring-white/40">
              {data?.StudentName?.charAt(0) || 'S'}
            </div>
            <h1 className="text-4xl font-black text-[#201E43] tracking-tight mb-2">
              {isEdit ? "Edit Profile" : (data?.StudentName || 'Student Profile')}
            </h1>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <DisplayField label="Student Name" name="StudentName" value={data.StudentName} />
            <DisplayField label="Enrollment No" name="EnrollmentNo" value={data.EnrollmentNo} />
            <DisplayField label="Email Address" name="Email" value={data.Email} />
            <DisplayField label="Phone Number" name="Phone" value={data.Phone} />
            
            <div className="md:col-span-2">
              <DisplayField label="About / Description" name="Description" value={data.Description} />
            </div>

            {isEdit && (
              <div className="md:col-span-2">
                <DisplayField label="Password" name="Password" value={data.Password} type="password" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-white/40 pt-10">
            <Link href="/admin/students" className="px-8 py-4 bg-[#201E43] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
              Back to Students
            </Link>

            {isEdit ? (
              <button type="submit" className="px-8 py-4 bg-white/50 text-[#201E43] rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white hover:bg-white transition-all shadow-xl">
                Save Changes
              </button>
            ) : (
              <Link href={`/admin/students/${data.StudentID}/edit`} className="px-8 py-4 bg-white/50 text-[#201E43] rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white hover:bg-white transition-all shadow-xl">
                Edit Profile
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}