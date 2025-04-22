import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export default function Globe() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://assets2.lottiefiles.com/packages/lf20_GofK09iPAE.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  if (!animationData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}