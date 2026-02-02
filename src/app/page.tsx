import { getResultByDate, getSiteSettings, getPreviousResults } from '@/lib/storage';
import Link from 'next/link';
import { LotteryResultJsonLd, TeerEventJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { ResponsibleGambling } from '@/components/ResponsibleGambling';

export const revalidate = 0;

// Helper function to get current time in Indian Standard Time (IST - UTC+5:30)
function getIndianTime(): Date {
  const now = new Date();
  // Get UTC time, then add 5 hours 30 minutes for IST
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
  return new Date(utc + istOffset);
}

// Helper function to get IST date string in YYYY-MM-DD format
function getIndianDateString(): string {
  const ist = getIndianTime();
  const year = ist.getFullYear();
  const month = String(ist.getMonth() + 1).padStart(2, '0');
  const day = String(ist.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Check if yesterday's result should still be shown (within 18 hours of result time)
function isYesterdayResultValid(resultType: 'day_round1' | 'day_round2' | 'night_round1' | 'night_round2'): boolean {
  const now = getIndianTime();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;

  // Result times in IST (convert to minutes from midnight)
  const resultTimes = {
    day_round1: 15 * 60 + 45,   // 3:45 PM = 945 minutes
    day_round2: 16 * 60 + 45,   // 4:45 PM = 1005 minutes
    night_round1: 21 * 60 + 10, // 9:10 PM = 1270 minutes
    night_round2: 22 * 60 + 10  // 10:10 PM = 1330 minutes
  };

  const scheduledTime = resultTimes[resultType];

  // Minutes elapsed since yesterday's scheduled time
  // Formula: (Time remaining in yesterday) + (Time passed today)
  // Time remaining in yesterday = 24*60 - scheduledTime
  const minutesSinceYesterday = (24 * 60 - scheduledTime) + currentTimeInMinutes;

  // Show result for 18 hours (1080 minutes)
  return minutesSinceYesterday <= 18 * 60;
}

export default async function Home() {
  const today = getIndianDateString();
  const indianTime = getIndianTime();
  const [result, settings, previousResults] = await Promise.all([
    getResultByDate(today),
    getSiteSettings(),
    getPreviousResults(today)
  ]);

  const yesterdayResult = previousResults.length > 0 ? previousResults[0] : null;

  // Helper to determine what to display
  const getDisplayValue = (
    round: 'round1' | 'round2' | 'night_round1' | 'night_round2',
    currentResult: any,
    prevResult: any
  ) => {
    // 1. If we have today's result, ALWAYS show it
    if (currentResult && currentResult[round]) {
      return currentResult[round];
    }

    // 2. If we have yesterday's result AND it's not expired (within 18h), show it
    // Map database keys to valid keys for our helper
    const checkType = round === 'round1' ? 'day_round1' :
      round === 'round2' ? 'day_round2' :
        round === 'night_round1' ? 'night_round1' :
          'night_round2';

    if (prevResult && prevResult[round] && isYesterdayResultValid(checkType as any)) {
      return prevResult[round];
    }

    // 3. Otherwise show replacement
    return 'XX';
  };

  const { youtubeVideoId, noticeText } = settings;

  const homeFaqs = [
    {
      question: 'What is Tripura Teer?',
      answer: 'Tripura Teer is a traditional archery-based lottery game popular in Northeast India. Players bet on numbers and results are based on the number of arrows hitting the target.'
    },
    {
      question: 'What time are Tripura Teer results announced?',
      answer: 'Day Teer: First Round at 3:45 PM, Second Round at 4:45 PM. Night Teer: First Round at 9:10 PM, Second Round at 10:10 PM (IST).'
    },
    {
      question: 'Is Tripura Teer legal?',
      answer: 'Yes, Teer is a legal lottery game regulated under state laws. It operates under specific regulations and is a traditional game of the region.'
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: 'https://tripurateer.in' }
  ];

  return (
    <>
      <LotteryResultJsonLd />
      <TeerEventJsonLd
        name="Tripura Day Teer First Round"
        description="Live Day Teer First Round (FR) result"
        startTime="15:45:00+05:30"
        location="Agartala, Tripura"
      />
      <TeerEventJsonLd
        name="Tripura Day Teer Second Round"
        description="Live Day Teer Second Round (SR) result"
        startTime="16:45:00+05:30"
        location="Agartala, Tripura"
      />
      <TeerEventJsonLd
        name="Tripura Night Teer First Round"
        description="Live Night Teer First Round (FR) result"
        startTime="21:10:00+05:30"
        location="Agartala, Tripura"
      />
      <TeerEventJsonLd
        name="Tripura Night Teer Second Round"
        description="Live Night Teer Second Round (SR) result"
        startTime="22:10:00+05:30"
        location="Agartala, Tripura"
      />
      <FAQJsonLd faqs={homeFaqs} id="home-faq" />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <main className="min-h-screen flex flex-col items-center py-8 px-4 font-sans relative teer-background">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Header with Logo */}
          <header className="flex flex-col items-center mb-6 w-full">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 animate-float">
              <img
                src="/logo.png"
                alt="Tripura Teer Logo"
                className="w-full h-full object-contain drop-shadow-2xl rounded-full border-4 border-white shadow-2xl"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[var(--color-navy)] uppercase tracking-tighter drop-shadow-sm text-center">
              Tripura Teer Result
            </h1>
            <p className="text-center text-gray-600 font-medium mt-3 max-w-2xl px-4 leading-relaxed">
              Fastest live updates for Tripura Teer Result today, including First Round (FR) and Second Round (SR) outcomes.
            </p>
            <div className="h-1.5 w-48 bg-gradient-to-r from-[var(--color-saffron)] via-white to-[var(--color-india-green)] rounded-full shadow-sm mt-4"></div>
          </header>

          <p className="text-lg md:text-xl font-bold text-gray-600 mb-6 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-gray-100">
            📅 {indianTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Notice Section */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all hover:scale-[1.01]">
            <div className="w-full h-32 md:h-48 relative bg-gray-100">
              <img
                src="/notice-banner.png"
                alt="Latest Notice"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
              <h3 className="absolute bottom-3 left-4 text-white font-black text-xl md:text-2xl drop-shadow-md flex items-center gap-2">
                <span className="animate-pulse">📢</span> LATEST UPDATE
              </h3>
            </div>
            <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-t-4 border-[var(--color-saffron)]">
              <p className="text-gray-800 font-bold text-lg leading-relaxed">{noticeText}</p>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full max-w-4xl flex flex-col gap-6 mb-8">
            {/* Day Teer */}
            <div className="glass-card shadow-xl rounded-2xl overflow-hidden border-t-4 border-[var(--color-saffron)]">
              <h2 className="text-xl md:text-2xl font-black text-center py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md tracking-wide">
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
                        {getDisplayValue('round1', result, yesterdayResult)}
                      </td>
                      <td className="p-3 text-3xl md:text-4xl text-[var(--color-india-green)] font-black drop-shadow-sm">
                        {getDisplayValue('round2', result, yesterdayResult)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Night Teer */}
            <div className="glass-card shadow-xl rounded-2xl overflow-hidden border-t-4 border-indigo-600">
              <h2 className="text-xl md:text-2xl font-black text-center py-3 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white shadow-md tracking-wide">
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
                        {getDisplayValue('night_round1', result, yesterdayResult)}
                      </td>
                      <td className="p-3 text-3xl md:text-4xl text-purple-600 font-black drop-shadow-sm">
                        {getDisplayValue('night_round2', result, yesterdayResult)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Previous Results Section */}
          <div className="w-full max-w-4xl glass-card shadow-xl rounded-2xl overflow-hidden border-t-4 border-blue-500 mb-8 transition-transform hover:scale-[1.01]">
            <Link href="/previous-results" className="block w-full cursor-pointer group">
              <div className="w-full relative overflow-hidden">
                <img
                  src="/previous-res-banner.png"
                  alt="Previous Results Banner"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50/80 backdrop-blur-sm border-t border-blue-100">
                <span className="text-blue-800 font-bold uppercase text-sm tracking-wider pl-2">Tap to view history</span>
                <span className="text-sm font-black text-blue-700 pr-2">View All →</span>
              </div>
            </Link>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-lg font-bold">
                <thead className="bg-[#000033] text-white">
                  <tr>
                    <th className="p-3 uppercase tracking-wider border-b-4 border-orange-500 text-xs">Date</th>
                    <th className="p-3 uppercase tracking-wider border-b-4 border-white text-xs">First</th>
                    <th className="p-3 uppercase tracking-wider border-b-4 border-green-500 text-xs">Second</th>
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
          <div className="w-full max-w-4xl glass-card shadow-xl rounded-2xl overflow-hidden border-t-4 border-orange-500 mb-8 transition-transform hover:scale-[1.01]">
            <Link href="/dream-numbers" className="block w-full cursor-pointer group">
              <div className="w-full relative overflow-hidden">
                <img
                  src="/dream-numbers-banner.png"
                  alt="Dream Numbers Banner"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50/80 backdrop-blur-sm border-t border-orange-100">
                <span className="text-orange-800 font-bold uppercase text-sm tracking-wider pl-2">Tap to see interpretation</span>
                <span className="text-sm font-black text-orange-700 pr-2">View All →</span>
              </div>
            </Link>
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
          <div className="w-full max-w-4xl glass-card shadow-xl rounded-2xl overflow-hidden border-t-4 border-green-600 mb-8 transition-transform hover:scale-[1.01]">
            <Link href="/common-numbers" className="block w-full cursor-pointer group">
              <div className="w-full relative overflow-hidden">
                <img
                  src="/common-numbers-banner.png"
                  alt="Common Numbers Banner"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50/80 backdrop-blur-sm border-t border-green-100">
                <span className="text-green-800 font-bold uppercase text-sm tracking-wider pl-2">Check common numbers</span>
                <span className="text-sm font-black text-green-700 pr-2">View All →</span>
              </div>
            </Link>
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
          <div className="w-full max-w-4xl glass-card shadow-2xl rounded-2xl overflow-hidden border-t-4 border-red-500 mb-8">
            <h2 className="text-xl md:text-2xl font-black text-center py-3 bg-gradient-to-r from-red-700 to-red-500 text-white shadow-md tracking-wide flex items-center justify-center gap-2">
              <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
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

          {/* Responsible Gambling Disclaimer */}
          <ResponsibleGambling />

          {/* Footer */}
          <footer className="mt-auto pt-6 text-gray-400 text-sm font-medium border-t border-gray-200 w-full text-center">
            © {new Date().getFullYear()} TripuraTeer.com | Made with ❤️ in India
          </footer>
        </div>
      </main>
    </>
  );
}
