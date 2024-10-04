import { CaptionLink } from '../types';
import { capitalizeFirstLetter } from './capitalize-first-letter';

export function urlToCaption(
  url: string,
  defaultCaption: string
): CaptionLink[] {
  const captionLinks: CaptionLink[] = [];
  url
    .replace(/\/$/, '')
    .split('/')
    .reduce((previousValue, accumulator, index, array) => {
      const routerLink = `${previousValue}/${array[index]}`;

      const obj: CaptionLink = {
        caption:
          accumulator !== ''
            ? capitalizeFirstLetter(accumulator)
            : capitalizeFirstLetter(defaultCaption),
        routerLink: routerLink.replace(/^\/\//, '/'),
      };

      if (array.length === index + 1) {
        obj.routerLinkActiveOptions = { exact: true };
      }

      captionLinks.push(obj);
      return routerLink;
    }, '');

  return captionLinks;
}
