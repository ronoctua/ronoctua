import { images } from '@config/config.json';
import { quotes } from '@data/quotes.json';

interface IRandomQuotes {
  quotesData?: string[][];
}

export const randomQuote = ({ quotesData = quotes }: IRandomQuotes) => {
  const { primaryColor } = images;
  const randomQuote = quotesData[Math.floor(Math.random() * quotes.length)];
  const author = randomQuote[0];
  const quote = randomQuote[1];

  return `
<span color="${primaryColor}"><b>Random Quote</b></span>\n
<span rise="10000"><small>"<i>${quote}</i>" <b>${author}</b></small></span>
`;
};
