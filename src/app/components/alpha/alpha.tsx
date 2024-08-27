'use client';  // Asegura que este archivo sea tratado como un Client Component

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RegisterAlphaTester() {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ margin: 0, height: '100%', overflow: 'hidden' }}>
      <iframe
        data-tally-src="https://tally.so/r/3XEAed?transparentBackground=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Register as alpha tester"
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }}
      />
    </div>
  );
}

