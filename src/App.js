import React, { useMemo, useState, useCallback } from 'react';
import { createStore, createStyleSet } from 'botframework-webchat';
import WebChat from './WebChat';

export default () => {
  const store = useMemo(
    () =>
      createStore({}, ({ dispatch }) => (next) => (action) => {
        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
          dispatch({
            type: 'WEB_CHAT/SEND_EVENT',
            payload: {
              name: 'webchat/join',
              value: {
                language: window.navigator.language,
              },
            },
          });
        } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
          if (action.payload.activity.from.role === 'bot') {
            setNewMessage(true);
          }
        }

        return next(action);
      }),
    []
  );

  const styleSet = useMemo(
    () =>
      createStyleSet({
        backgroundColor: 'Transparent',
      }),
    []
  );

  const [newMessage, setNewMessage] = useState(false);
  const [token, setToken] = useState();

  const handleFetchToken = useCallback(async () => {
    if (!token) {
      const res = await fetch(
        'https://webchat-mockbot.azurewebsites.net/directline/token',
        { method: 'POST' }
      );
      const { token } = await res.json();

      setToken(token);
    }
  }, [setToken, token]);

  return (
    <WebChat
      className="react-web-chat"
      onFetchToken={handleFetchToken}
      store={store}
      styleSet={styleSet}
      token={token}
    />
  );
};
