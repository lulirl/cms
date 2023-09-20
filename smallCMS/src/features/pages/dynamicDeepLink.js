import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DynamicDeepLink() {
  const { screen, challengeId, senderId, isCustom } = useParams();

    

useEffect(() => {
    const deepLinkURL = `com.smallandsimple.ios://${screen}?challengeId=${challengeId}&senderId=${senderId}&isCustom=${isCustom}`;
    
    window.location.href = deepLinkURL;

  }, [screen, challengeId, senderId, isCustom]);

useEffect(() => {
    const timer = setTimeout(() => {
      if (document.hidden) {
        return;
      }
      window.location.href = "https://apps.apple.com/us/app/small-and-simple/id1661062603";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <div>Redirecting...</div>;
}

export default DynamicDeepLink;