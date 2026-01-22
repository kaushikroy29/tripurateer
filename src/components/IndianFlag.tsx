export default function IndianFlag({ className = "w-16 h-10" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className={className}>
            <path fill="#FF9933" d="M0 0h900v200H0z" />
            <path fill="#FFFFFF" d="M0 200h900v200H0z" />
            <path fill="#138808" d="M0 400h900v200H0z" />
            <circle cx="450" cy="300" r="85" fill="#000080" />
            <circle cx="450" cy="300" r="70" fill="#FFFFFF" />
            <circle cx="450" cy="300" r="10" fill="#000080" />
            <g stroke="#000080" strokeWidth="3">
                {[...Array(24)].map((_, i) => (
                    <line
                        key={i}
                        x1="450"
                        y1="300"
                        x2="450"
                        y2="370"
                        transform={`rotate(${i * 15} 450 300)`}
                    />
                ))}
            </g>
        </svg>
    );
}
