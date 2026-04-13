/** Template for trash smiley face */
function trashSmile() {
    return `<span>Trash</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <path d="M20 24l8 8M28 24l-8 8M36 24l8 8M44 24l-8 8" stroke="#2F2F2F" stroke-width="3" stroke-linecap="round"/>
                <path d="M18 46c8-6 20-6 28 0" fill="none" stroke="#2F2F2F" stroke-width="4" stroke-linecap="round"/>
            </svg>`
}

/** Template for lame smiley face */
function lameSmile() {
    return `<span>Lame</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <path d="M20 26c4-2 6-2 10 0M34 26c4 2 6 2 10 0" stroke="#2F2F2F" stroke-width="3" stroke-linecap="round" fill="none"/>
                <path d="M20 44c8-2 16-1 24 2" stroke="#2F2F2F" stroke-width="4" stroke-linecap="round" fill="none"/>
            </svg>`
}

/** Template for meh smiley face */
function mehSmile() {
    return `<span>Meh</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <circle cx="22" cy="26" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="26" r="3" fill="#2F2F2F"/>
                <path d="M20 44h24" stroke="#2F2F2F" stroke-width="4" stroke-linecap="round"/>
            </svg>`
}

/** Template for basic smiley face */
function basicSmile() {
    return `<span>Basic</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <circle cx="22" cy="26" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="26" r="3" fill="#2F2F2F"/>
                <path d="M20 42h24" stroke="#2F2F2F" stroke-width="4" stroke-linecap="round"/>
            </svg>`
}

/** Template for alright smiley face */
function alrightSmile() {
    return `<span>Alright</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <circle cx="22" cy="26" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="26" r="3" fill="#2F2F2F"/>
                <path d="M22 40c6 6 14 6 20 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`
}

/** Template for chill smiley face */
function chillSmile() {
    return `<span>Chill</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <path d="M18 27c3-3 7-3 10 0M36 27c3-3 7-3 10 0" stroke="#2F2F2F" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M22 42c6 4 14 4 20 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`
}

/** Template for cool smiley face */
function coolSmile() {
    return `<span>Cool</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <circle cx="22" cy="26" r="3" fill="#2F2F2F"/>
                <circle cx="42" cy="26" r="3" fill="#2F2F2F"/>
                <path d="M20 40c8 8 16 8 24 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`
}

/** Template for awesome smiley face */
function awesomeSmile() {
    return `<span>Awesome</span>
            <svg width="28" height="28" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#FFD54F"/>
                <polygon points="22,20 24,26 30,26 25,30 27,36 22,32 17,36 19,30 14,26 20,26" fill="#2F2F2F"/>
                <polygon points="50,26 44,26 42,20 40,26 34,26 39,30 37,36 42,32 47,36 45,30" fill="#2F2F2F"/>
                <path d="M22 42c6 6 14 6 20 0" stroke="#2F2F2F" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`
}

/** Template for epic smiley face */
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

/** Template for absolutely great smiley face */
function absolutelyGreatSmile() {
    return `<span>Absolutely Great</span>
            <svg width="28" height="28" viewBox="0 0 40 60">
                <defs>
                    <linearGradient id="g-trophy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFD54F"/>   <!-- gold oben -->
                    <stop offset="100%" stop-color="#FFA000"/> <!-- dunkleres gold unten -->
                    </linearGradient>
                </defs>

            <!-- Cup body -->
                <path d="M10 8h20v16c0 8-6 14-10 16-4-2-10-8-10-16V8z" 
                    fill="url(#g-trophy)" stroke="#2F2F2F" stroke-width="2"/>

            <!-- Handle left -->
                <path d="M10 12c-6 0-6 12 0 12" 
                    fill="none" stroke="#2F2F2F" stroke-width="2"/>

            <!-- Handle right -->
                <path d="M30 12c6 0 6 12 0 12" 
                    fill="none" stroke="#2F2F2F" stroke-width="2"/>

            <!-- Stem -->
                <rect x="18" y="40" width="4" height="6" fill="url(#g-trophy)" stroke="#2F2F2F" stroke-width="1"/>

            <!-- Base -->
                <rect x="12" y="48" width="16" height="6" fill="#6D4C41" stroke="#2F2F2F" stroke-width="2"/>
            </svg>`
}

/** Template for legendary smiley face */
function legendarySmile() {
  return `  <span>Legendary</span>
            <svg width="28" height="28" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                    <radialGradient id="g-legendary-11" cx="40%" cy="30%" r="65%">
                        <stop offset="0%" stop-color="#FFF9E6"/>
                        <stop offset="30%" stop-color="#FFD54F"/>
                        <stop offset="100%" stop-color="#FFAB00"/>
                    </radialGradient>

                    <filter id="f-legendary-11" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="1.2" stdDeviation="1.6" flood-color="#000" flood-opacity="0.18"/>
                    </filter>
                </defs>

                <!-- Medallion -->
                <g filter="url(#f-legendary-11)">
                    <circle cx="32" cy="26" r="20" fill="url(#g-legendary-11)" stroke="#2F2F2F" stroke-width="1.6"/>
                    <!-- central star -->
                    <polygon points="32,14 36,24 48,24 38.5,30 42.5,40 32,34 21.5,40 25.5,30 16,24 28,24"
                        fill="#FFFFFF" fill-opacity="0.96" stroke="#2F2F2F" stroke-width="0.9"/>
                </g>

                <!-- Decoration -->
                <path d="M12 34c6-10 12-12 20-12s14 2 20 12" fill="none" stroke="#2F2F2F" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M14 38c5-8 10-10 18-10s13 2 18 10" fill="none" stroke="#2F2F2F" stroke-width="0.8" stroke-linecap="round"/>

                <!-- Ribbons -->
                <path d="M24 44 l6 12 l-6 0 l2 -8 l-2 0" fill="#D84315" stroke="#2F2F2F" stroke-width="1"/>
                <path d="M40 44 l-6 12 l6 0 l-2 -8 l2 0" fill="#EF6C00" stroke="#2F2F2F" stroke-width="1"/>

                <!-- subtle sparks/shine animation -->
                <g transform="translate(50,10)">
                    <rect x="-1" y="-3" width="2" height="6" rx="1" fill="#FFFFFF" opacity="0.9">
                        <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="-3" y="-1" width="6" height="2" rx="1" fill="#FFFFFF" opacity="0.9">
                        <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" begin="0.4s" repeatCount="indefinite"/>
                    </rect>
                </g>
            </svg>`;
}

