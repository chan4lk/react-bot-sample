import React from 'react';

const activityMiddleware = () => (next) => ({
  activity,
  nextVisibleActivity,
  ...otherArgs
}) => {
  const { name, type } = activity;

  if (type === 'event' && name === 'passwordInput') {
    return () => <div>Custom Card here</div>;
  } else {
    return next({ activity, nextVisibleActivity, ...otherArgs });
  }
};

const attachmentMiddleware = () => (next) => (card) => {
  switch (card.attachment.contentType) {
    case 'application/vnd.microsoft.botframework.samples.github-repository':
      return <div>{card.attachment.content.owner} </div>;

    default:
      return next(card);
  }
};

export { activityMiddleware, attachmentMiddleware };
