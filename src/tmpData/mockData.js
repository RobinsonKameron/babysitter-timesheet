import flattenDeep from 'lodash.flattendeep';
import { MAGGIE, JOHNNY } from './mockChildren';
import { allDates, datesToShow } from './mockDates';

const PLACEHOLDER_SPACE = { value: ' ', readOnly: true, id: 'space' };

const KIDS = [MAGGIE, JOHNNY];

const BASE_HEADERS = ['Month', 'Day', '#', 'Total', ''];
const HEADERS_PER_KID = ['Hours per day', 'Paid/day', 'Notes', ' '];
const HEADERS = [...BASE_HEADERS, ...flattenDeep(KIDS.map(kid => HEADERS_PER_KID))].map(
  text => ({ value: text, readOnly: true }),
);

/**
 *
 * @param {array} children - An array of children being displayed in the time sheet
 * @param {string} dateString - String in format "MMDDYY" representing day to sum
 */
const dailySum = (children, dateString) => children.reduce((sum, currentChild) => {
  const childTargetDate = currentChild.dates[dateString];
  return sum + childTargetDate.paid;
}, 0);

/**
 *
 * @param {array} datesToShow - Array of dateStrings to call dailySum on each one individually
 */
const weeklySum = datesToShow => datesToShow
  .map(dateString => dailySum(KIDS, dateString))
  .reduce((acc, curr) => acc + curr, 0);

export const mockData = [
  [
    { ...PLACEHOLDER_SPACE, colSpan: 5 },
    ...flattenDeep(KIDS.map(({ info }) => [{ value: info.name, colSpan: 3 }, PLACEHOLDER_SPACE])),
  ],
  HEADERS,
  ...datesToShow.map(dateString => [
    { value: allDates[dateString].dayOfWeek, readOnly: true, id: 'dayOfWeek' },
    { value: allDates[dateString].month, readOnly: true, id: 'month' },
    { value: allDates[dateString].dayOfMonth, readOnly: true, id: 'dayOfMonth' },
    { value: dailySum(KIDS, dateString), readOnly: true, format: 'curr' },
    PLACEHOLDER_SPACE,
    ...flattenDeep(KIDS.map(({ info, dates }) => [
      {
        value: dates[dateString].hours, id: 'hours',
      },
      { value: dates[dateString].paid, id: 'paid', format: 'curr' },
      { value: dates[dateString].notes, id: 'notes' },
      PLACEHOLDER_SPACE,
    ])),
  ]),
  [{
    value: 'WE Sep 8 Total', colSpan: 3, readOnly: true,
  }, { value: weeklySum(datesToShow), readOnly: true, format: 'curr' }],
];
