import React, { useEffect } from 'react';

const CactusComments = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://latest.cactus.chat/cactus.js';
    script.async = true;

    // Attach an onload event listener to the script
    script.onload = () => {
      // Now that the script has loaded, you can safely call initComments
      initComments({
        node: document.getElementById("comment-section"),
        defaultHomeserverUrl: "https://matrix.cactus.chat:8448",
        serverName: "cactus.chat",
        siteName: "deal-with-the-devil.com",
        commentSectionId: "section1",
      });
    };

    // Append the script to the document's body
    document.body.appendChild(script);

    // Cleanup: remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="comment-section"></div>
  );
};

export default CactusComments;
