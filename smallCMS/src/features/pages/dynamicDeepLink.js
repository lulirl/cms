import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DynamicDeepLink() {
  const { screen, challengeId, senderId, isCustom } = useParams();

  useEffect(() => {
    const deepLinkURL = `com.smallandsimple.ios://${screen}?challengeId=${challengeId}&senderId=${senderId}&isCustom=${isCustom}`;
    
    window.location.href = deepLinkURL;

    setTimeout(() => {
      window.location.href = "https://apps.apple.com/";  // replace with your App Store URL
    }, 500);

  }, [screen, challengeId, senderId, isCustom]);

  return <div>Redirecting...</div>;
}

export default DynamicDeepLink;