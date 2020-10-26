import React from 'react';
import * as AdaptiveCards from 'adaptivecards';
import { hooks } from 'botframework-webchat';
export const PasswordCard = ({ payload, config }) => {
  const { useSendPostBack } = hooks;
  const postBack = useSendPostBack();
  var card = payload || {
    type: 'AdaptiveCard',
    version: '1.0',
    body: [
      {
        type: 'Image',
        url: 'https://adaptivecards.io/content/adaptive-card-50.png',
      },
      {
        type: 'TextBlock',
        text: 'Hello **Adaptive Cards!**',
      },
    ],
    actions: [
      {
        type: 'Action.OpenUrl',
        title: 'Learn more',
        url: 'https://adaptivecards.io',
      },
      {
        type: 'Action.OpenUrl',
        title: 'GitHub',
        url: 'https://github.com/Microsoft/AdaptiveCards',
      },
    ],
  };

  // Create an AdaptiveCard instance
  var adaptiveCard = new AdaptiveCards.AdaptiveCard();

  // Set its hostConfig property unless you want to use the default Host Config
  // Host Config defines the style and behavior of a card
  adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
    fontFamily: 'Segoe UI, Helvetica Neue, sans-serif',
    ...config,
    // More host config options
  });

  // Set the adaptive card's event handlers. onExecuteAction is invoked
  // whenever an action is clicked in the card
  adaptiveCard.onExecuteAction = (action) => {
    alert('Ow!');
    postBack('sample:password-input');
  };

  // Parse the card payload
  adaptiveCard.parse(card);

  // Render the card to an HTML element:
  var renderedCard = adaptiveCard.render();

  return (
    <div
      ref={(n) => {
        n && n.childNodes.length === 0 && n.appendChild(renderedCard);
      }}
    />
  );
};
