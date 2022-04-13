import 'dotenv/config';
import imageMagick from 'imagemagick';

import { images as imagesConfig } from '@config/config.json';

import { handleError } from './error';

interface ICreateImage {
  path?: string;
  width?: string;
  height?: string;
  fontFamily?: string;
  fontSize?: string;
  alignContent?: string;
  textColor?: string;
  backgroundColor?: string;
  filename: string;
  content: string | Promise<string | null>;
}

interface ICreateAnimation {
  path?: string;
  gifDelay?: string;
  gifExtent?: string;
  filename: string;
}

const { WORKSPACE_PATH: workspacePath } = process.env;

const {
  width: widthSize,
  height: heightSize,
  fontFamily: font,
  textColor: color,
  backgroundColor: background,
  gifDelay: delay,
  gifExtent: extent,
  extension: imageExtension,
  animationExtension,
} = imagesConfig;

export const createImage = async ({
  path = `${workspacePath}/assets/images`,
  width = widthSize,
  height = heightSize,
  fontFamily = font,
  fontSize = '12',
  alignContent = 'east',
  textColor = color,
  backgroundColor = background,
  filename,
  content,
}: ICreateImage) => {
  const contentData = await content;

  if (typeof contentData !== 'string' || contentData === '') {
    handleError({ message: `>>> ${filename} data was not received!` });
    return;
  }

  imageMagick.convert(
    [
      '-size',
      `${width}x${height}`,
      '-background',
      `${backgroundColor}`,
      '-fill',
      `${textColor}`,
      '-font',
      `${fontFamily}`,
      '-pointsize',
      `${fontSize}`,
      '-gravity',
      `${alignContent}`,
      `pango:${contentData}`,
      `${path}/${filename}.${imageExtension}`,
    ],
    (error) => error && handleError({ message: error }),
  );
};

export const createAnimation = ({
  path = `${workspacePath}/assets/images`,
  gifDelay = delay,
  gifExtent = extent,
  filename,
}: ICreateAnimation) => {
  imageMagick.convert(
    [
      '-delay',
      `${gifDelay}`,
      '-loop',
      '0',
      '-gravity',
      'center',
      '-extent',
      `${gifExtent}`,
      `${path}/*.${imageExtension}`,
      `${path}/${filename}.${animationExtension}`,
    ],
    (error) => error && handleError({ message: error }),
  );
};
