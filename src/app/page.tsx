import { getResultByDate, getSiteSettings, getPreviousResults } from '@/lib/storage';
import Link from 'next/link';
import IndianFlag from '@/components/IndianFlag';

export const revalidate = 0;

export default async function Home() {
  const today = new Date().toISOString().split('T')[0];
  const [result, settings, previousResults] = await Promise.all([
    getResultByDate(today),
    getSiteSettings(),
    getPreviousResults(today)
  ]);

  const { youtubeVideoId, noticeText } = settings;

  return (
    <main className="min-h-screen flex flex-col items-center py-8 px-4 font-sans relative" style={{
      background: 'linear-gradient(180deg, #FF9933 0%, #FF9933 20%, #FFFFFF 20%, #FFFFFF 50%, #138808 50%, #138808 100%)',
    }}>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full">
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

        {/* Results Section */}
        <div className="w-full max-w-4xl flex flex-col gap-6 mb-8">
          {/* Day Teer */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01] border-t-4 border-[var(--color-saffron)]">
            <h2 className="text-xl md:text-2xl font-black text-center py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md tracking-wide">
              ☀️ DAY TEER RESULTS
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
            <h2 className="text-xl md:text-2xl font-black text-center py-3 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white shadow-md tracking-wide">
              🌙 NIGHT TEER RESULTS
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

        {/* Previous Results Section */}
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-blue-500 mb-8">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
            <h2 className="text-xl md:text-2xl font-black uppercase">📜 Previous Results</h2>
            <Link href="/previous-results" className="text-sm hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-lg font-bold">
              <thead className="bg-[var(--color-navy)] text-white">
                <tr>
                  <th className="p-3 uppercase tracking-wider border-b-4 border-orange-500">Date</th>
                  <th className="p-3 uppercase tracking-wider border-b-4 border-white">First</th>
                  <th className="p-3 uppercase tracking-wider border-b-4 border-green-500">Second</th>
                </tr>
              </thead>
              <tbody>
                {previousResults.slice(0, 7).map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                    <td className="p-3 text-sm text-[var(--color-navy)] border-b border-gray-200">
                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="p-3 text-red-600 font-black border-b border-gray-200">{item.round1}</td>
                    <td className="p-3 text-green-700 font-black border-b border-gray-200">{item.round2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dream Numbers Section */}
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-orange-500 mb-8">
          <div className="flex justify-between items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
            <h2 className="text-xl md:text-2xl font-black uppercase">💭 Dream Numbers</h2>
            <Link href="/dream-numbers" className="text-sm hover:underline">View All →</Link>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="font-bold text-orange-800">🐍 Snake</div>
              <div className="text-2xl font-black text-orange-600">07, 37</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="font-bold text-orange-800">🌊 Water</div>
              <div className="text-2xl font-black text-orange-600">12, 42</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="font-bold text-orange-800">🔥 Fire</div>
              <div className="text-2xl font-black text-orange-600">21, 51</div>
            </div>
          </div>
        </div>

        {/* Common Numbers Section */}
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-green-600 mb-8">
          <div className="flex justify-between items-center bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
            <h2 className="text-xl md:text-2xl font-black uppercase">🔢 Common Numbers</h2>
            <Link href="/common-numbers" className="text-sm hover:underline">View All →</Link>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {['12', '23', '34', '45', '56', '67', '78', '89', '90', '01'].map((num) => (
                <div key={num} className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl md:text-2xl font-black text-green-700">{num}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Stream Section */}
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden border-t-4 border-red-500 mb-8">
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


        {/* Footer */}
        <footer className="mt-auto pt-6 text-gray-400 text-sm font-medium border-t border-gray-200 w-full text-center">
          © {new Date().getFullYear()} TripuraTeer.com | Made with ❤️ in India
        </footer>
      </div>
    </main>
  );
}
