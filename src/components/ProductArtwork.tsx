import React from 'react';
import { IllustrationKey } from '../types';

interface ProductArtworkProps {
  illustrationKey: IllustrationKey;
  title: string;
  compact?: boolean;
}

const ARTWORK_PALETTES: Record<
  IllustrationKey,
  { bgLight: string; bgDark: string; accent: string; secondary: string }
> = {
  tomatoes: {
    bgLight: 'from-[#F1EFEA] to-[#E6E3DB]',
    bgDark: 'dark:from-[#1B201C] dark:to-[#141815]',
    accent: '#C44536',
    secondary: '#3A6B44',
  },
  radish: {
    bgLight: 'from-[#EFF2EC] to-[#E3E8DF]',
    bgDark: 'dark:from-[#1A201B] dark:to-[#131814]',
    accent: '#B83A52',
    secondary: '#2E6240',
  },
  mushrooms: {
    bgLight: 'from-[#F2EFE8] to-[#E5DFD3]',
    bgDark: 'dark:from-[#1D1E19] dark:to-[#151612]',
    accent: '#C98A32',
    secondary: '#6B523B',
  },
  flour: {
    bgLight: 'from-[#F2EFE9] to-[#E6E1D6]',
    bgDark: 'dark:from-[#1C1D1A] dark:to-[#141513]',
    accent: '#9C7A4C',
    secondary: '#4C5E44',
  },
  oats: {
    bgLight: 'from-[#EFF0EB] to-[#E2E4DC]',
    bgDark: 'dark:from-[#1A1D19] dark:to-[#131613]',
    accent: '#B28F55',
    secondary: '#3E5E46',
  },
  honey: {
    bgLight: 'from-[#F4F0E6] to-[#EAE2D0]',
    bgDark: 'dark:from-[#1E1D17] dark:to-[#161510]',
    accent: '#D18B28',
    secondary: '#4B6B4A',
  },
  rosehip: {
    bgLight: 'from-[#F2ECEA] to-[#E7DFDC]',
    bgDark: 'dark:from-[#1E1A19] dark:to-[#161312]',
    accent: '#B9483E',
    secondary: '#395E45',
  },
  cheese: {
    bgLight: 'from-[#F1F1EC] to-[#E4E4DC]',
    bgDark: 'dark:from-[#1B1D19] dark:to-[#141613]',
    accent: '#D8C796',
    secondary: '#3B6347',
  },
  beetkvass: {
    bgLight: 'from-[#F0EBED] to-[#E4DCE0]',
    bgDark: 'dark:from-[#1D191B] dark:to-[#151214]',
    accent: '#8E2942',
    secondary: '#3A5E46',
  },
  sauerkraut: {
    bgLight: 'from-[#EFF1EA] to-[#E2E6DA]',
    bgDark: 'dark:from-[#1A1D18] dark:to-[#131612]',
    accent: '#C5A248',
    secondary: '#3A6345',
  },
  flaxoil: {
    bgLight: 'from-[#EDF0EB] to-[#DFE5DC]',
    bgDark: 'dark:from-[#181D1A] dark:to-[#121613]',
    accent: '#7A542E',
    secondary: '#2D5A3D',
  },
  herbaltea: {
    bgLight: 'from-[#ECF1EC] to-[#DDE6DF]',
    bgDark: 'dark:from-[#171E19] dark:to-[#111613]',
    accent: '#3F7050',
    secondary: '#D4A843',
  },
};

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  illustrationKey,
  title,
  compact = false,
}) => {
  const palette = ARTWORK_PALETTES[illustrationKey];

  return (
    <div
      role="img"
      aria-label={title}
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${palette.bgLight} ${palette.bgDark} flex items-center justify-center select-none`}
    >
      {/* Subtle architectural tabletop line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[28%] border-t border-black/5 dark:border-white/6 bg-black/[0.025] dark:bg-white/[0.02]"
      />

      <svg
        viewBox="0 0 240 180"
        className={`${compact ? 'w-11 h-11' : 'w-4/5 h-4/5'} relative z-10 drop-shadow-sm transition-transform duration-200 ease-out group-hover:scale-[1.03]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {illustrationKey === 'tomatoes' && (
          <g>
            <path d="M68 62 C95 45, 145 48, 174 68" stroke={palette.secondary} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M96 54 L92 70 M138 56 L142 74" stroke={palette.secondary} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="92" cy="96" r="28" fill={palette.accent} />
            <circle cx="83" cy="87" r="7" fill="white" fillOpacity="0.22" />
            <circle cx="144" cy="102" r="25" fill="#D45B3E" />
            <circle cx="136" cy="94" r="6" fill="white" fillOpacity="0.22" />
            <circle cx="118" cy="116" r="19" fill="#DF9636" />
            <path d="M87 68 L92 74 L98 68 M92 66 L92 76" stroke={palette.secondary} strokeWidth="2.2" strokeLinecap="round" />
            <path d="M139 76 L144 82 L149 76" stroke={palette.secondary} strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {illustrationKey === 'radish' && (
          <g>
            <path d="M126 84 C140 56, 166 44, 184 54 C170 72, 152 80, 130 88 Z" fill={palette.secondary} />
            <path d="M120 82 C130 48, 154 32, 172 34 C162 56, 146 72, 126 86 Z" fill="#467E58" />
            <ellipse cx="96" cy="106" rx="22" ry="18" fill={palette.accent} />
            <path d="M74 108 C64 114, 56 122, 50 130" stroke="#E5D5C8" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="122" cy="118" rx="19" ry="15" fill="#C94E66" />
            <path d="M104 122 C94 128, 86 135, 80 142" stroke="#E5D5C8" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {illustrationKey === 'mushrooms' && (
          <g>
            <rect x="52" y="114" width="136" height="22" rx="4" fill="#D3B791" stroke="#A68860" strokeWidth="1.5" />
            <path d="M74 114 L78 90 C64 86, 62 72, 84 72 C106 72, 104 86, 90 90 L94 114 Z" fill={palette.accent} />
            <path d="M112 114 L116 82 C98 78, 96 60, 122 60 C148 60, 146 78, 128 82 L132 114 Z" fill="#D99B3E" />
            <path d="M150 114 L152 94 C140 90, 140 76, 158 76 C176 76, 176 90, 164 94 L166 114 Z" fill={palette.secondary} />
          </g>
        )}

        {illustrationKey === 'flour' && (
          <g>
            <path d="M84 44 L156 44 L164 134 C164 138, 160 142, 155 142 L85 142 C80 142, 76 138, 76 134 Z" fill="#C7AD89" stroke="#9B815D" strokeWidth="1.5" />
            <rect x="86" y="38" width="68" height="12" rx="2" fill="#B59972" />
            <rect x="94" y="68" width="52" height="44" rx="2" fill="#F4EFE6" stroke="#8C7453" strokeWidth="1.2" />
            <path d="M120 76 L120 104 M114 82 L120 88 L126 82 M114 92 L120 98 L126 92" stroke={palette.secondary} strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="176" cy="134" rx="16" ry="6" fill="#EDE6D8" />
          </g>
        )}

        {illustrationKey === 'oats' && (
          <g>
            <path d="M74 102 C74 130, 166 130, 166 102 Z" fill="#D8D7CE" stroke="#9EA095" strokeWidth="1.5" />
            <ellipse cx="120" cy="102" rx="46" ry="12" fill="#EAE6D7" stroke="#9EA095" strokeWidth="1.5" />
            <ellipse cx="110" cy="101" rx="6" ry="3" fill={palette.accent} />
            <ellipse cx="124" cy="104" rx="6" ry="3" fill={palette.accent} />
            <ellipse cx="134" cy="99" rx="6" ry="3" fill="#C7A76C" />
            <path d="M154 90 C162 66, 174 50, 184 38" stroke={palette.secondary} strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="172" cy="54" rx="4" ry="8" transform="rotate(-30 172 54)" fill={palette.accent} />
            <ellipse cx="164" cy="68" rx="4" ry="8" transform="rotate(-30 164 68)" fill={palette.accent} />
          </g>
        )}

        {illustrationKey === 'honey' && (
          <g>
            <rect x="84" y="58" width="72" height="82" rx="14" fill="#E8E4D9" fillOpacity="0.5" stroke="#B6B0A2" strokeWidth="1.8" />
            <rect x="88" y="72" width="64" height="64" rx="10" fill={palette.accent} fillOpacity="0.92" />
            <rect x="92" y="46" width="56" height="12" rx="3" fill="#A68256" />
            <line x1="158" y1="36" x2="178" y2="118" stroke="#9D7648" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="156" cy="40" rx="11" ry="8" transform="rotate(-15 156 40)" fill="#B58B58" />
            <circle cx="104" cy="92" r="5" fill="white" fillOpacity="0.25" />
          </g>
        )}

        {illustrationKey === 'rosehip' && (
          <g>
            <rect x="88" y="64" width="64" height="76" rx="10" fill="#EAE6E2" stroke="#B4ACA7" strokeWidth="1.5" />
            <rect x="92" y="76" width="56" height="60" rx="7" fill={palette.accent} />
            <rect x="94" y="52" width="52" height="12" rx="3" fill="#3B423D" />
            <rect x="98" y="90" width="44" height="28" rx="2" fill="#F7F4EE" />
            <circle cx="120" cy="104" r="6" fill={palette.accent} />
            <circle cx="66" cy="126" r="10" fill={palette.accent} />
            <path d="M56 126 L48 122" stroke={palette.secondary} strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {illustrationKey === 'cheese' && (
          <g>
            <polygon points="58,128 178,122 162,138 66,142" fill="#DFD5C3" />
            <ellipse cx="120" cy="84" rx="46" ry="18" fill={palette.accent} stroke="#B8A674" strokeWidth="1.5" />
            <path d="M74 84 L74 114 C74 124, 166 124, 166 114 L166 84" fill="#E8DAB2" stroke="#B8A674" strokeWidth="1.5" />
            <path d="M148 122 C164 118, 180 108, 190 96" stroke={palette.secondary} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M168 114 L174 104 M178 106 L184 96" stroke={palette.secondary} strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {illustrationKey === 'beetkvass' && (
          <g>
            <path d="M98 42 L116 42 L118 64 L132 78 L132 136 C132 140, 128 142, 124 142 L90 142 C86 142, 82 140, 82 136 L82 78 L96 64 Z" fill="#EAE6E7" fillOpacity="0.6" stroke="#ABA3A6" strokeWidth="1.5" />
            <path d="M85 84 L129 84 L129 136 C129 138, 126 139, 124 139 L90 139 C88 139, 85 138, 85 136 Z" fill={palette.accent} />
            <rect x="98" y="32" width="18" height="12" rx="2" fill="#A68258" />
            <circle cx="158" cy="122" r="18" fill={palette.accent} />
            <path d="M158 104 C156 92, 164 82, 170 76" stroke={palette.secondary} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {illustrationKey === 'sauerkraut' && (
          <g>
            <rect x="82" y="54" width="76" height="86" rx="12" fill="#EFEFE9" fillOpacity="0.7" stroke="#A7AC9E" strokeWidth="1.8" />
            <rect x="87" y="68" width="66" height="68" rx="8" fill={palette.accent} fillOpacity="0.88" />
            <path d="M96 86 Q120 78, 144 90 M94 104 Q120 96, 146 108 M98 122 Q120 116, 142 124" stroke="#E8D896" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="88" y="44" width="64" height="10" rx="3" fill="#D5D7CF" stroke="#9EA397" strokeWidth="1.5" />
          </g>
        )}

        {illustrationKey === 'flaxoil' && (
          <g>
            <path d="M108 38 L132 38 L134 62 L148 76 L148 136 C148 140, 144 142, 140 142 L100 142 C96 142, 92 140, 92 136 L92 76 L106 62 Z" fill={palette.accent} />
            <rect x="108" y="28" width="24" height="10" rx="2" fill="#2A2F2B" />
            <rect x="98" y="84" width="44" height="38" rx="2" fill="#F2EFE8" />
            <path d="M120 94 C124 98, 124 106, 120 110 C116 106, 116 98, 120 94 Z" fill={palette.secondary} />
            <path d="M162 132 C172 114, 178 96, 182 78" stroke={palette.secondary} strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {illustrationKey === 'herbaltea' && (
          <g>
            <rect x="86" y="64" width="68" height="76" rx="10" fill="#7D9683" stroke="#5D7563" strokeWidth="1.5" />
            <ellipse cx="120" cy="64" rx="34" ry="8" fill="#5D7563" />
            <circle cx="108" cy="62" r="5" fill="#E8C75A" />
            <circle cx="122" cy="60" r="6" fill="#F2D76D" />
            <circle cx="134" cy="63" r="4.5" fill="#E8C75A" />
            <path d="M120 90 L120 118 M112 98 L120 106 L128 98" stroke="#F2EFE8" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

export const HeroPantryArtwork: React.FC = () => {
  return (
    <div
      role="img"
      aria-label="Kompozycja ekologicznych produktów ze spiżarni: świeże pomidory, miód lipowy, olej lniany i mąka z samopszy"
      className="relative w-full h-full min-h-[280px] lg:min-h-[420px] overflow-hidden rounded-xl border border-[#1E2A20]/10 dark:border-white/10 bg-gradient-to-br from-[#EAECE6] via-[#E2E6DD] to-[#D6DDD2] dark:from-[#161D17] dark:via-[#131914] dark:to-[#0F1410] flex items-center justify-center p-6 sm:p-10"
    >
      <svg
        viewBox="0 0 560 360"
        className="w-full h-full max-w-[520px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Architectural arch & sunlight beams */}
        <path
          d="M110 310 L110 140 C110 68, 210 42, 280 42 C350 42, 450 68, 450 140 L450 310 Z"
          className="fill-[#F7F8F5]/75 dark:fill-[#1C241E]/80 stroke-[#234F32]/15 dark:stroke-[#58A874]/20"
          strokeWidth="1.5"
        />
        <line
          x1="48"
          y1="310"
          x2="512"
          y2="310"
          className="stroke-[#234F32]/25 dark:stroke-[#58A874]/25"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Heritage Grain Sack */}
        <g>
          <path
            d="M138 158 L224 158 L234 308 L128 308 Z"
            className="fill-[#CEB592] dark:fill-[#8A765B]"
          />
          <rect
            x="140"
            y="146"
            width="82"
            height="16"
            rx="3"
            className="fill-[#B79B75] dark:fill-[#736048]"
          />
          <rect
            x="150"
            y="194"
            width="62"
            height="58"
            rx="2"
            className="fill-[#F6F3EC] dark:fill-[#E8E2D5]"
          />
          <path
            d="M181 206 L181 240 M173 214 L181 222 L189 214 M173 226 L181 234 L189 226"
            stroke="#234F32"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* Cold-pressed oil amber bottle */}
        <g>
          <path
            d="M266 106 L292 106 L295 144 L314 166 L314 308 L244 308 L244 166 L263 144 Z"
            fill="#7D5229"
          />
          <rect x="266" y="92" width="26" height="14" rx="2" fill="#222823" />
          <rect x="252" y="188" width="54" height="54" rx="2" fill="#F6F3EC" />
          <circle cx="279" cy="215" r="10" fill="#234F32" fillOpacity="0.18" />
          <path d="M279 207 C284 212, 284 220, 279 224 C274 220, 274 212, 279 207 Z" fill="#234F32" />
        </g>

        {/* Raw Honey Jar */}
        <g>
          <rect
            x="338"
            y="204"
            width="78"
            height="104"
            rx="14"
            fill="#ECE6D8"
            fillOpacity="0.55"
            stroke="#A89F8D"
            strokeWidth="1.5"
          />
          <rect x="344" y="220" width="66" height="82" rx="10" fill="#D48D26" />
          <rect x="348" y="190" width="58" height="14" rx="3" fill="#9E7B4F" />
          <circle cx="362" cy="244" r="6" fill="white" fillOpacity="0.25" />
        </g>

        {/* Fresh heirloom tomatoes & botanical branch */}
        <g>
          <circle cx="114" cy="292" r="24" fill="#C44536" />
          <circle cx="148" cy="298" r="19" fill="#DF9636" />
          <path
            d="M398 184 C416 142, 434 114, 464 88"
            className="stroke-[#2D5A3D] dark:stroke-[#58A874]"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="434"
            cy="128"
            rx="10"
            ry="20"
            transform="rotate(30 434 128)"
            className="fill-[#3A6F4D] dark:fill-[#58A874]"
          />
          <ellipse
            cx="412"
            cy="154"
            rx="9"
            ry="18"
            transform="rotate(-35 412 154)"
            className="fill-[#2D5A3D] dark:fill-[#4B9364]"
          />
        </g>
      </svg>

      {/* Editorial caption corner */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#2E3A30] dark:text-[#BFD0C1] bg-white/85 dark:bg-[#131814]/85 backdrop-blur-sm border border-black/8 dark:border-white/10 rounded-lg px-3.5 py-2.5">
        <span className="font-medium">Zbiory jesień–zima · Certyfikat PL-EKO</span>
        <span className="font-mono-tabular">12 produktów</span>
      </div>
    </div>
  );
};
