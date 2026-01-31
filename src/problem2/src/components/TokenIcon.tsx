import { FC, useState } from 'react';

const TOKEN_ICON_BASE = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens';

const TokenIcon: FC<TokenIconProps> = ({ currency, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!currency) return null;

  const src = `${TOKEN_ICON_BASE}/${currency}.svg`;

  if (error) return null;

  const sizeClass = className || 'w-6 h-6';

  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${sizeClass}`}>
      {!loaded && (
        <span
          className={`absolute inset-0 rounded-full bg-placeholder/40 animate-pulse ${sizeClass}`}
          aria-hidden
        />
      )}
      <img
        src={src}
        alt=""
        className={`relative max-w-full max-h-full object-contain ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </span>
  );
};

export default TokenIcon;
