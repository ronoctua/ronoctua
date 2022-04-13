import 'dotenv/config';
import core from '@actions/core';

export const handleError = ({ message }: { message: string | Error }) => {
  const { ENVIRONMENT: environment } = process.env;

  if (environment === 'development') {
    throw new Error(`\n🚩 ${message}\n`);
  } else {
    core.error(message);
  }
};
