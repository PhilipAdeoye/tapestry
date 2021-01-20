import { isToday, isTomorrow, isYesterday } from 'date-fns';

// Create an array with a range of digits like so [start, start+1, ... , end]
export const createInclusiveRange = (start, end) => {
  const length = ++end - start;
  return Array.from({ length }, (_, i) => start + i);
};

// Get a random number between the min and max. The number can include either the min and max
export const getInclusiveRandomInteger = (min, max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Remove any characters that isn't numeric from a text string
export const stripNonDigits = (text) => {
  return text.replace(/\D/g, '');
};

// Assume text entered in a text area with line breaks
// Get each line in it's own array element
export const getParagraphsFromTextBody = (bodyText) => {
  // https://stackoverflow.com/a/54502026

  return bodyText.match(/[^\r\n]+/g);
};

export const toQueryString = (paramsObject) => {
  // https://stackoverflow.com/a/39828481

  const str = Object.keys(paramsObject)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`
    )
    .join('&');

  return str.length > 0 ? `?${str}` : '';
};

export const getRelativeDateIfClose = (date) => {
  let formattedDate = '';
  if (isYesterday(date)) {
    formattedDate = 'Yesterday';
  } else if (isToday(date)) {
    formattedDate = 'Today';
  } else if (isTomorrow(date)) {
    formattedDate = 'Tomorrow';
  } else {
    formattedDate = date;
  }
  return formattedDate;
};

export const numberAsCardinalWord = (number) => {
  const remainder = parseInt(number, 10) % 10;
  let cardinal = '';
  switch (remainder) {
    case 1:
      // Numbers that end with 11 have a 'th' suffix
      if (number.toString().endsWith('11')) {
        cardinal = `${number}th`;
      } else {
        cardinal = `${number}st`;
      }
      break;
    case 2:
      cardinal = `${number}nd`;
      break;
    case 3:
      cardinal = `${number}rd`;
      break;
    default:
      cardinal = `${number}st`;
      break;
  }
  return cardinal;
};

export const scrollToTop = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  });
};
