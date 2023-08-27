import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DynamicDeepLink() {
  const { screen, challengeId, senderId, isCustom } = useParams();

    

  const [attemptedToOpenApp, setAttemptedToOpenApp] = useState(false);

  useEffect(() => {
    const deepLinkURL = `com.smallandsimple.ios://${screen}?challengeId=${challengeId}&senderId=${senderId}&isCustom=${isCustom}`;
    
    const handleVisibilityChange = () => {
      // Only redirect to App Store if we tried opening the app and it's still in the foreground
      if (attemptedToOpenApp && !document.hidden) {
        window.location.href = "https://apps.apple.com/";
      }
    };

    // Attempt to open the app
    window.location.href = deepLinkURL;
    setAttemptedToOpenApp(true);
    
    // Add a slight delay before attaching the event listener
    const timer = setTimeout(() => {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }, 500);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [screen, challengeId, senderId, isCustom]);

  return <div>Redirecting...</div>;

}

export default DynamicDeepLink;