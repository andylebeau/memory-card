import { useEffect, useRef } from 'react';

export default function GetPresidents() {
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchPresidents = async () => {
        const response = await fetch(
          'https://api.sampleapis.com/presidents/presidents'
        );
        const json = await response.json();
        console.log(json);
      };
      fetchPresidents();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
}
