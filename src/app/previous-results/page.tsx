import { getPreviousResults } from '@/lib/storage';
import Link from 'next/link';

export const revalidate = 0;

export default async function PreviousResults() {
    const today = new Date().toISOString().split('T')[0];
    const history = await getPreviousResults(today);

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 font-sans">
            <header className="flex flex-col items-center mb-6 w-full">
                <h1 className="text-3xl md:text-5xl font-black text-[var(--color-navy)] mb-2 uppercase text-center drop-shadow-sm flex items-center justify-center gap-3">
                    <img src="/teer-icon.png" alt="Decoration" className="h-12 w-auto invert" />
                    Previous Results
                    <img src="/teer-icon.png" alt="Decoration" className="h-12 w-auto invert" style={{ transform: 'scaleX(-1)' }} />
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-india-green)] rounded-full"></div>
            </header>

            <div className="w-full max-w-2xl overflow-x-auto bg-white shadow-xl border-0 rounded-xl mb-8">
                <table className="w-full border-collapse text-center text-xl font-bold">
                    <thead className="bg-[var(--color-navy)] text-white">
                        <tr>
                            <th className="p-4 uppercase tracking-wider border-b-4 border-orange-500 w-1/3">Date</th>
                            <th className="p-4 uppercase tracking-wider border-b-4 border-white w-1/3">First</th>
                            <th className="p-4 uppercase tracking-wider border-b-4 border-green-500 w-1/3">Second</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-orange-50 transition-colors`}>
                                <td className="p-4 text-lg text-[var(--color-navy)] border-b border-gray-200">
                                    {new Date(item.date).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </td>
                                <td className="p-4 text-red-600 font-black border-b border-gray-200 border-l border-r">{item.round1}</td>
                                <td className="p-4 text-green-700 font-black border-b border-gray-200">{item.round2}</td>
                            </tr>
                        ))}

                        {history.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-400 font-medium">
                                    No previous results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 justify-center w-full max-w-2xl">
                <Link
                    href="/"
                    className="bg-white hover:bg-gray-100 text-[var(--color-navy)] font-bold py-3 px-8 rounded-xl shadow-md border-b-4 border-gray-200 transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                >
                    &larr; Back to Home
                </Link>
                <Link
                    href="/dream-numbers"
                    className="bg-gradient-saffron text-white font-bold py-3 px-8 rounded-xl shadow-lg border-b-4 border-orange-700 transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                >
                    Dream Numbers
                </Link>
                <Link
                    href="/common-numbers"
                    className="bg-gradient-green text-white font-bold py-3 px-8 rounded-xl shadow-lg border-b-4 border-green-800 transition-all active:scale-95 text-lg flex-1 text-center min-w-[200px]"
                >
                    Common Numbers
                </Link>
            </div>
        </main>
    );
}
