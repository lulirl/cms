import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DynamicDeepLink() {
  const { screen, challengeId, senderId, isCustom } = useParams();

  const isAndroid = /Android/i.test(navigator.userAgent);

  useEffect(() => {
    const deepLinkURL = isAndroid 
      ? `com.smallandsimple.android://${screen}?challengeId=${challengeId}&senderId=${senderId}&isCustom=${isCustom}`
      : `com.smallandsimple.ios://${screen}?challengeId=${challengeId}&senderId=${senderId}&isCustom=${isCustom}`;
    
    window.location.href = deepLinkURL;

  }, [screen, challengeId, senderId, isCustom]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (document.hidden) {
        return;
      }
      const storeLink = isAndroid 
        ? "https://play.google.com/store/apps"
        : "https://apps.apple.com/us/app/small-and-simple/id1661062603";
      
      window.location.href = storeLink;
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAndroid]);

  return <div>Redirecting...</div>;
}

export default DynamicDeepLink;
