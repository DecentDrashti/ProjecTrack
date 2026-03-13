import Link from "next/link"
import { AddReviewAction } from "@/app/action/AddReviewAction";

export default function AddReviewPage({ params }: { params: { id: string } }) {
  const ID = Number(params.id)

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12">
            <div className="max-w-3xl mx-auto px-6">

                {/* Header */}
                <div className="flex justify-between items-end border-b border-slate-200 pb-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-[#201E43]">
                            Add Review
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            Record the latest project progress
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <form action={AddReviewAction} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">

                    {/* Progress Slider */}
                    <div>
                        <input type="hidden" name="ProjectGroupID" value={ID} />
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                            Progress Percentage
                        </label>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            className="w-full accent-indigo-600"
                        />

                        <div className="text-right text-sm font-black text-indigo-600 mt-2">
                            50%
                        </div>
                    </div>

                    {/* Progress Summary */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                            Progress Summary
                        </label>

                        <textarea
                            rows={4}
                            placeholder="Describe what has been completed since the last review..."
                            className="w-full rounded-2xl border border-slate-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    {/* Faculty Remark */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                            Faculty Remark
                        </label>

                        <textarea
                            rows={3}
                            placeholder="Provide feedback or suggestions..."
                            className="w-full rounded-2xl border border-slate-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">

                        <Link
                            href="/faculty/review"
                            className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:border-slate-300"
                        >
                            Back to review
                        </Link>

                        <button
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-indigo-700"
                        >
                            Save Review
                        </button>

                    </div>

                </form>

            </div>
        </div>
        
    )
}