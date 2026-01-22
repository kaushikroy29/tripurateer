import { getResultByDate, getSiteSettings } from '@/lib/storage';
import Link from 'next/link';
import IndianFlag from '@/components/IndianFlag';

export const revalidate = 0;

export default async function Home() {
  const today = new Date().toISOString().split('T')[0];
  const [result, settings] = await Promise.all([
    getResultByDate(today),
    getSiteSettings()
  ]);

  const { youtubeVideoId, noticeText } = settings;

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 flex flex-col items-center py-8 px-4 font-sans">
      {/* Header with Flag */}
      <header className="flex flex-col items-center mb-6 w-full">
        <div className="flex items-center gap-4 mb-2">
          <IndianFlag className="w-14 h-9 shadow-md rounded-sm" />
          <h1 className="text-4xl md:text-6xl font-black text-[var(--color-navy)] uppercase tracking-tighter drop-shadow-sm">
            Tripura Teer
          </h1>
          <IndianFlag className="w-14 h-9 shadow-md rounded-sm hidden md:block" />
        </div>
        <div className="h-1.5 w-48 bg-gradient-to-r from-[var(--color-saffron)] via-white to-[var(--color-india-green)] rounded-full shadow-sm"></div>
      </header>

      <p className="text-lg md:text-xl font-bold text-gray-600 mb-6 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-gray-100">
        📅 {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {/* Notice Section */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-[var(--color-saffron)] p-4 rounded-r-xl shadow-md mb-8 animate-pulse">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📢</span>
          <div>
            <h3 className="font-black text-[var(--color-navy)] text-lg uppercase">Latest Notice</h3>
            <p className="text-gray-700 font-medium">{noticeText}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Results + Live Stream */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Today's Result Card */}
        <div className="flex flex-col gap-6">
          {/* Day Teer */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01] border-t-4 border-[var(--color-saffron)]">
            <h2 className="text-xl md:text-2xl font-black text-center py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md tracking-wide flex flex-col">
              <span>☀️ DAY TEER RESULTS</span>
            </h2>

            <div className="p-4">
              <table className="w-full text-center text-lg font-bold">
                <thead>
                  <tr className="bg-orange-50">
                    <th className="p-2 text-[var(--color-navy)] uppercase tracking-wider border-b-2 border-orange-200 text-xs">Target</th>
                    <th className="p-2 text-[var(--color-navy)] uppercase tracking-wider border-b-2 border-orange-200 text-xs">
                      FR <span className="block text-[10px] text-gray-500">3:45 PM</span>
                    </th>
                    <th className="p-2 text-[var(--color-navy)] uppercase tracking-wider border-b-2 border-orange-200 text-xs">
                      SR <span className="block text-[10px] text-gray-500">4:45 PM</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 text-gray-500 font-extrabold bg-gray-50 text-sm">Result</td>
                    <td className="p-3 text-3xl md:text-4xl text-[var(--color-saffron)] font-black drop-shadow-sm">
                      {result?.round1 || 'XX'}
                    </td>
                    <td className="p-3 text-3xl md:text-4xl text-[var(--color-india-green)] font-black drop-shadow-sm">
                      {result?.round2 || 'XX'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Night Teer */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01] border-t-4 border-indigo-600">
            <h2 className="text-xl md:text-2xl font-black text-center py-3 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white shadow-md tracking-wide flex flex-col">
              <span>🌙 NIGHT TEER RESULTS</span>
            </h2>

            <div className="p-4">
              <table className="w-full text-center text-lg font-bold">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="p-2 text-[var(--color-navy)] uppercase tracking-wider border-b-2 border-indigo-200 text-xs">Target</th>
                    <th className="p-2 text-[var(--color-navy)] uppercase tracking-wider border-b-2 border-indigo-200 text-xs">
                      FR <span className="block text-[10px] text-gray-500">9:10 PM</span>
                    </th>
                    <th className="p-2 text-[var(--color-navy)] uppercase tracking-wider border-b-2 border-indigo-200 text-xs">
                      SR <span className="block text-[10px] text-gray-500">10:10 PM</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 text-gray-500 font-extrabold bg-gray-50 text-sm">Result</td>
                    <td className="p-3 text-3xl md:text-4xl text-indigo-600 font-black drop-shadow-sm">
                      {result?.night_round1 || 'XX'}
                    </td>
                    <td className="p-3 text-3xl md:text-4xl text-purple-600 font-black drop-shadow-sm">
                      {result?.night_round2 || 'XX'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live YouTube Section */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-t-4 border-red-500">
          <h2 className="text-xl md:text-2xl font-black text-center py-3 bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md tracking-wide flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
            LIVE STREAM
          </h2>
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&mute=1`}
              title="Tripura Teer Live Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center py-2 text-xs text-gray-400 font-medium">Watch Live Teer Results</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4 justify-center w-full max-w-4xl mb-8">
        <Link
          href="/previous-results"
          className="bg-white hover:bg-blue-50 text-[var(--color-navy)] hover:text-blue-800 font-bold py-4 px-8 rounded-xl text-lg shadow-lg border-b-4 border-blue-200 transition-all active:scale-95 flex-1 text-center min-w-[180px]"
        >
          📜 Previous Results
        </Link>
        <Link
          href="/dream-numbers"
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg border-b-4 border-orange-700 transition-all active:scale-95 flex-1 text-center min-w-[180px]"
        >
          💭 Dream Numbers
        </Link>
        <Link
          href="/common-numbers"
          className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg border-b-4 border-green-800 transition-all active:scale-95 flex-1 text-center min-w-[180px]"
        >
          🔢 Common Numbers
        </Link>
      </div>


      {/* Footer */}
      <footer className="mt-auto pt-6 text-gray-400 text-sm font-medium border-t border-gray-200 w-full text-center">
        © {new Date().getFullYear()} TripuraTeer.com | Made with ❤️ in India
      </footer>
    </main>
  );
}
