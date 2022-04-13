interface IGenerateBarChart {
  percent: number;
  barSize?: number;
}

export const generateBarChart = ({
  percent,
  barSize = 12,
}: IGenerateBarChart) => {
  const fraction = Math.floor((barSize * 8 * percent) / 100);
  const barsFull = Math.floor(fraction / 8);
  const semi = fraction % 8;
  const syms = '░████████';
  // const syms = "░▏▎▍▌▋▊▉█";

  if (barsFull >= barSize) {
    return syms.substring(8, 9).repeat(barSize);
  }

  return [syms.substring(8, 9).repeat(barsFull), syms.substring(semi, semi + 1)]
    .join('')
    .padEnd(barSize, syms.substring(0, 1));
};
