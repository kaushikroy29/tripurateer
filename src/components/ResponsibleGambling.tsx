'use client';

export function ResponsibleGambling() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-8 mb-4 px-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">🔞</span>
                    <h3 className="text-red-800 font-bold text-lg">18+ Only | Responsible Gaming</h3>
                </div>
                <p className="text-red-700 text-sm font-medium mb-3">
                    Teer is a game of chance. Play responsibly. This website provides results for informational purposes only.
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-xs">
                    <a
                        href="https://www.responsiblegambling.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 underline font-semibold"
                    >
                        Responsible Gambling Resources
                    </a>
                    <span className="text-red-400">|</span>
                    <span className="text-red-600 font-semibold">
                        Gambling can be addictive. Please play within your limits.
                    </span>
                </div>
            </div>
        </div>
    );
}

export function AgeRestrictionBadge() {
    return (
        <div className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold border border-red-200">
            <span>🔞</span>
            <span>18+ Only</span>
        </div>
    );
}
