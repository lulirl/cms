import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DynamicDeepLink() {
  const { screen, challengeId, senderId, isCustom } = useParams();

  useEffect(() => {
    const deeplink = () => {
      let ua = navigator.userAgent.toLowerCase();
      let isIphone = ua.indexOf('iphone') > -1;
  
      if (isIphone) {
        let app = {
          launchApp: function () {
            window.open(
              `exp://10.10.11.154:19000/--/${screen}?challengeId=${challengeId}&senderId=${senderId}&isCustom=${isCustom}`,
              '_blank'
            );
          }
        };
        app.launchApp();
      } else {
  
        let app = {
          openWebApp: function () {
            window.open(
              'https://apps.apple.com/',
              '_blank'
            );
          },
        };
  
        app.openWebApp();
      }
  }
  deeplink();

  }, [screen, challengeId, senderId, isCustom]);

  return <div>Redirecting...</div>;
}

export default DynamicDeepLink;