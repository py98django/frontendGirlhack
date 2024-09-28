// app/disco-room/page.tsx
'use client';

import { useEffect } from 'react';

const DiscoRoom = () => {
  useEffect(() => {
    const colors = ['#FF0000', '#FF9900', '#FF00FF', '#00FF00', '#00FFFF', '#0000FF'];
    let currentColorIndex = 0;
    const interval = setInterval(() => {
      document.body.style.backgroundColor = colors[currentColorIndex];
      currentColorIndex = (currentColorIndex + 1) % colors.length;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <h2>Welcome to the Disco Room!</h2>
      <p>Enjoy the lights and colors changing to the rhythm of the disco!</p>
    </main>
  );
};

export default DiscoRoom;