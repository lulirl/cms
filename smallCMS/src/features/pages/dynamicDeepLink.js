import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DynamicDeepLink() {
  const { screen, challengeId, senderId, isCustom } = useParams();

    

useEffect(() => {
    const deepLinkURL = `com.smallandsimple.ios://${screen}?challengeId=${challengeId}&senderId=${senderId}&isCustom=${isCustom}`;
    
    window.location.href = deepLinkURL;

    const timer = setTimeout(() => {
      if (document.hidden) {
        return;
      }
      window.location.href = "https://apps.apple.com/";
    }, 4000);

    return () => clearTimeout(timer);

  }, [screen, challengeId, senderId, isCustom]);

  return <div>Redirecting...</div>;
}

export default DynamicDeepLink;