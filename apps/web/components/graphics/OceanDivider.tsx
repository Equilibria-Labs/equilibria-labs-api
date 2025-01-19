import React from 'react';

const OceanDivider: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100%'
      height='100%'
      fill='none'
      viewBox='0 0 1500 127'
      preserveAspectRatio='none'
    >
      <g clipPath='url(#a)'>
        <path
          fill='url(#b)'
          d='M-20 12.478S207.096 0 355.582 2.88c165.426 3.208 251.036 17.504 417.071 18.237C970.628 21.99 1072.5 0 1270.52 0 1425.55 0 1526 9.505 1526 9.505V177H-20V12.478Z'
        />
        <path
          fill='url(#c)'
          d='M-14 38.17s155.037-18.753 303.523-15.868c165.425 3.214 323.095 23.788 489.13 24.522C976.628 47.7 1085.05 35.19 1283.07 35.19c155.03 0 248.93 17.404 248.93 17.404V203H-14V38.17Z'
        />
        <path
          fill='url(#d)'
          d='M-10 62.03s144.119-12.478 292.605-9.599c205.259 3.98 320.91 34.78 486.944 35.513 197.976.873 181.242-16.797 458.561-13.917 154.86 1.608 286.05 13.917 286.05 13.917L1536 235H-10V62.03Z'
        />
        <path
          fill='#324242'
          d='M-19.948 99.844s-7.002-19.13 141.928-17.775c222.722 2.025 268.577 30.746 604.843 30.746 198.009 0 238.006-12.491 515.317-9.608 154.86 1.609 272.94 17.775 272.94 17.775L1526 273H-19.948V99.844Z'
        />
      </g>
      <defs>
        <linearGradient
          id='b'
          x1='-20'
          x2='1522.12'
          y1='74.869'
          y2='154.151'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#40E0D0' />
          <stop offset='1' stopColor='#38A08A' />
        </linearGradient>
        <linearGradient
          id='c'
          x1='1532'
          x2='-5.336'
          y1='61.823'
          y2='180.155'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#38A08A' />
          <stop offset='1' stopColor='#2E6246' />
        </linearGradient>
        <linearGradient
          id='d'
          x1='1536'
          x2='-6.116'
          y1='100.421'
          y2='21.134'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2E6246' />
          <stop offset='1' stopColor='#324242' />
        </linearGradient>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h1500v127H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default OceanDivider;
