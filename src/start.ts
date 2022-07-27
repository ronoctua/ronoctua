import { twitterAccount, images as imagesConfig } from '@config/config.json';

import { createAnimation, createImage } from './createImage';
import { handleError } from './error';
import { languages } from './languages';
import { randomQuote } from './quote';
import { createTwitterImage } from './twitter';

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

let quoteContent: string;
let languagesData: string | null | undefined;

const getImageContent = async () => {
  quoteContent = randomQuote({});
  languagesData = await languages();
};

const createImages = () => {
  if (!languagesData) {
    return;
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
};

getImageContent().then(() => {
  createImages();
});
