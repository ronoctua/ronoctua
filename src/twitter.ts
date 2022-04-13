import 'dotenv/config';
import Twit from 'twit';

import { images } from '@config/config.json';

import { createImage } from './createImage';
import { handleError } from './error';

const {
  TWITTER_API_KEY: twitterApiKey,
  TWITTER_API_SECRET_KEY: twitterApiSecretKey,
  TWITTER_ACCESS_TOKEN: twitterAccessToken,
  TWITTER_ACCESS_TOKEN_SECRET: twitterAccessTokenSecret,
} = process.env;

const twitterApi = new Twit({
  consumer_key: twitterApiKey as 'string',
  consumer_secret: twitterApiSecretKey as 'string',
  access_token: twitterAccessToken,
  access_token_secret: twitterAccessTokenSecret,
});

export const createTwitterImage = ({
  accountName,
  numberOfTweets = 1,
  filename,
}: {
  accountName: string;
  numberOfTweets?: number;
  filename: string;
}) => {
  twitterApi.get(
    'statuses/user_timeline',
    { screen_name: accountName, count: numberOfTweets },
    (err, data) => {
      if (err) {
        handleError({ message: `>>> Twitter API Error!\n${err}` });
      }

      const { primaryColor } = images;
      const twitterData = data as [{ text: string }];
      let tweets = '';

      twitterData.forEach((tweet: { text: string }) => {
        tweets += `${tweet.text}\n`;
      });

      const twitterContent = `
<span color="${primaryColor}"><b>${
        numberOfTweets === 1 ? 'Last tweet' : 'Last tweets'
      }</b>  <small>  @${accountName}</small></span>\n
<span rise="10000"><small>${tweets}</small></span>
      `;

      createImage({ filename, content: twitterContent });
    },
  );
};
