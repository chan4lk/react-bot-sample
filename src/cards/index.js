import React from 'react';
import { PasswordCard } from './password-card';
const activityMiddleware = () => (next) => ({
  activity,
  nextVisibleActivity,
  ...otherArgs
}) => {
  const { name, type } = activity;

  if (type === 'event' && name === 'passwordInput') {
    return () => <PasswordCard config={{}} />;
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
