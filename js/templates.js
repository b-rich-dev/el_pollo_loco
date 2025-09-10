function trashSmile() {
    return `<span>Trash</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <path d="M20 24l8 8M28 24l-8 8M36 24l8 8M44 24l-8 8" stroke="#2F2F2F" stroke-width="3" stroke-linecap="round"/>
                <path d="M18 46c8-6 20-6 28 0" fill="none" stroke="#2F2F2F" stroke-width="4" stroke-linecap="round"/>
            </svg>`
}

function lameSmile() {
    return `<span>Lame</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <path d="M20 26c4-2 6-2 10 0M34 26c4 2 6 2 10 0" stroke="#2F2F2F" stroke-width="3" stroke-linecap="round" fill="none"/>
                <path d="M20 44c8-2 16-1 24 2" stroke="#2F2F2F" stroke-width="4" stroke-linecap="round" fill="none"/>
            </svg>`
}

function mehSmile() {
    return `<span>Meh</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <circle cx="22" cy="26" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="26" r="3" fill="#2F2F2F"/>
                <path d="M20 44h24" stroke="#2F2F2F" stroke-width="4" stroke-linecap="round"/>
            </svg>`
}

function basicSmile() {
    return `<span>Basic</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <circle cx="22" cy="26" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="26" r="3" fill="#2F2F2F"/>
                <path d="M20 42h24" stroke="#2F2F2F" stroke-width="4" stroke-linecap="round"/>
            </svg>`
}

function alrightSmile() {
    return `<span>Alright</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <circle cx="22" cy="26" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="26" r="3" fill="#2F2F2F"/>
                <path d="M22 40c6 6 14 6 20 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`
}

function chillSmile() {
    return `<span>Chill</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <path d="M18 27c3-3 7-3 10 0M36 27c3-3 7-3 10 0" stroke="#2F2F2F" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M22 42c6 4 14 4 20 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`
}

function coolSmile() {
    return `<span>Cool</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <circle cx="22" cy="26" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="26" r="3" fill="#2F2F2F"/>
                <path d="M20 40c8 8 16 8 24 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`
}

function awesomeSmile() {
    return `<span>Awesome</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <polygon points="22,20 24,26 30,26 25,30 27,36 22,32 17,36 19,30 14,26 20,26" fill="#2F2F2F"/>
                <polygon points="50,26 44,26 42,20 40,26 34,26 39,30 37,36 42,32 47,36 45,30" fill="#2F2F2F"/>
                <path d="M22 42c6 6 14 6 20 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`
}

function epicSmile() {
    return `<span>Epic</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <polygon points="32,8 26,22 38,22" fill="#7E57C2"/>
                <circle cx="32" cy="6" r="2.5" fill="#7E57C2"/>
                <circle cx="22" cy="28" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="28" r="3" fill="#2F2F2F"/>
                <path d="M18 40c9 10 19 10 28 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M22 42c8 4 12 4 20 0" stroke="#2F2F2F" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>`
}

function absolutelyGreatSmile() {
    return `<svg width="28" height="28" viewBox="0 0 40 60">
                <defs>
                    <linearGradient id="g-trophy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFD54F"/>   <!-- gold oben -->
                    <stop offset="100%" stop-color="#FFA000"/> <!-- dunkleres gold unten -->
                    </linearGradient>
                </defs>

            <!-- Pokalkörper -->
                <path d="M10 8h20v16c0 8-6 14-10 16-4-2-10-8-10-16V8z" 
                    fill="url(#g-trophy)" stroke="#2F2F2F" stroke-width="2"/>

            <!-- Henkel links -->
                <path d="M10 12c-6 0-6 12 0 12" 
                    fill="none" stroke="#2F2F2F" stroke-width="2"/>

            <!-- Henkel rechts -->
                <path d="M30 12c6 0 6 12 0 12" 
                    fill="none" stroke="#2F2F2F" stroke-width="2"/>

            <!-- Stiel -->
                <rect x="18" y="40" width="4" height="6" fill="url(#g-trophy)" stroke="#2F2F2F" stroke-width="1"/>

            <!-- Sockel -->
                <rect x="12" y="48" width="16" height="6" fill="#6D4C41" stroke="#2F2F2F" stroke-width="2"/>
            </svg>

        <span>Absolutely Great</span>`
}