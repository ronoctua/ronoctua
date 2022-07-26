import 'dotenv/config';

// @ts-ignore
import { WakaTimeClient, RANGE } from 'wakatime-client';

import { images as imagesConfig } from '@config/config.json';

import { generateBarChart } from './generateBarChart';

export const languages = async () => {
  const { primaryColor, secondaryTextColor } = imagesConfig;

  const { WAKATIME_API_KEY: wakatimeApiKey } = process.env;
  const wakatime = new WakaTimeClient(wakatimeApiKey);
  const response = await wakatime.getMyStats({ range: RANGE.LAST_7_DAYS });

  const languagesData = [];

  if (!response.data.languages) {
    return null;
  }

  for (let i = 0; i < Math.min(response.data.languages.length, 5); i++) {
    const responseLanguageData = response.data.languages[i];
    const { name, percent } = responseLanguageData;

    const barChart = generateBarChart({ percent });

    const formattedLanguage = [
      `<span><small>${barChart}  <small>${name}   <span fgcolor="${secondaryTextColor}">${`${String(
        percent.toFixed(1),
      )}%`}</span></small></small></span>\n`,
    ];

    languagesData.push(formattedLanguage);
  }

  if (languagesData.length === 0) {
    return null; // Returning null will keep old metrics.
  }

  return `
<span color="${primaryColor}"><b>Most used languages</b> <small>(last days)</small></span>\n
<span rise="-10000">${languagesData.join('')}</span>
  `;
};
