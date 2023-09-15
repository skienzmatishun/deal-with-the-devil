import React, { useEffect } from 'react';

const CactusComments = () => {
  useEffect(() => {
    initComments({
      node: document.getElementById("comment-section"),
      defaultHomeserverUrl: "https://matrix.cactus.chat:8448",
      serverName: "cactus.chat",
      siteName: "deal-with-the-devil.com",
      commentSectionId: "section1",
    });
  }, []);

  return (
    <div id="comment-section"></div>
  );
};

export default CactusComments;