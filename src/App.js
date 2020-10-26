import React, { useEffect, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

export default () => {
  const [directLine, setDirectLine] = useState();

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch(
          'https://webchat-mockbot.azurewebsites.net/directline/token',
          { method: 'POST' }
        );
        const { token } = await res.json();
        const directLine = createDirectLine({ token });
        setDirectLine(directLine);
      } catch (err) {
        console.error(err);
      }
    }

    fetchToken();
  }, []);

  if (directLine) {
    return (
      <ReactWebChat
        className="bot"
        directLine={directLine}
        userID="YOUR_USER_ID"
      />
    );
  } else {
    return <div className="bot">Loading...</div>;
  }
};
