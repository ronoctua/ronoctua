import { exit } from 'process';

import { twitterAccount, images as imagesConfig } from '@config/config.json';

import { createAnimation, createImage } from './createImage';
import { handleError } from './error';
import { languages } from './languages';
import { randomQuote } from './quote';
import { createTwitterImage } from './twitter';

const quoteContent = randomQuote({});
const languagesData = languages();
const {
  welcomeFilename,
  quoteFilename,
  languagesFilename,
  twitterFilename,
  animationFilename,
  welcomeContent,
  welcomeHeight,
  welcomeFontSize,
} = imagesConfig;

if (!languagesData) {
  // throw new Error('>>> No programming language data');
  console.log('>>> No programming language data');
  exit();
}

try {
  createImage({
    filename: welcomeFilename,
    content: welcomeContent,
    height: welcomeHeight,
    fontSize: welcomeFontSize,
    alignContent: 'center',
  });
  createImage({ filename: quoteFilename, content: quoteContent });
  createImage({ filename: languagesFilename, content: languagesData });
  createTwitterImage({
    filename: twitterFilename,
    accountName: twitterAccount,
  });

  setTimeout(async () => {
    createAnimation({ filename: animationFilename });
  }, 7000);
} catch (error: any) {
  handleError(error.message);
}
