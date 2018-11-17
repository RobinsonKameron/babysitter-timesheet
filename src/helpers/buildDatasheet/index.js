import React from 'react';
import { Link } from 'react-router-dom';
import flattenDeep from 'lodash.flattendeep';
import { dailySumAllChildren } from './sums';
import { buildRows } from './buildRows';
import { Checkbox } from '../../components/Checkbox';

const PLACEHOLDER_SPACE = { value: ' ', readOnly: true, id: 'space' };
const PLACEHOLDER_SPACE_STICKY = {
  value: ' ', readOnly: true, id: 'space', className: 'sticky',
};
const STICKY_TOP_FIRST_ROW = 'sticky-top-first-row';
const STICKY_TOP_SECOND_ROW = 'sticky-top-second-row';
const STICKY_TOP_THIRD_ROW = 'sticky-top-third-row';

const BASE_HEADERS = ['Date', '', '', 'Total', ''];
const headersPerChild = rateType => (rateType === 'HOURLY' ? ['Hours', 'Paid', 'Notes', ' '] : ['Seen?', 'Paid', 'Notes', ' ']);
const WEEK_ENDING_ROW = 'week-ending-row';

/**
 *
 * @param {array} Children
 * @param {string} date 'YYYY-MM'
 * @param {func} onFixedCheckboxChange : Function to fire when checkbox for fixed rates is clicked
 */
export const buildDatasheet = (Children, date, onFixedCheckboxChange) => {
  const rowsInTable = buildRows(Children, date);
  console.log('rowsInTable', rowsInTable);

  const HEADERS = [...BASE_HEADERS, ...flattenDeep(Children.map(kid => console.log('kid', kid) || headersPerChild(kid.info.rateType)))].map(
    text => ({ value: text, readOnly: true, className: STICKY_TOP_THIRD_ROW }),
  );

  return [
    // FIRST ROW: Names with Links to Child Pages
    [
      {
        ...PLACEHOLDER_SPACE,
        colSpan: 4,
        className: STICKY_TOP_FIRST_ROW,
        style: {
          backgroundColor: 'red',
        },
      },
      PLACEHOLDER_SPACE,
      ...flattenDeep(Children.map(({ info }) => [
        {
          value: info.name,
          colSpan: 3,
          readOnly: true,
          valueViewer: () => (
            <Link to={`/child/${info.id}`}>
              <span role="img" aria-label="child-emoji">{info.gender === 'MALE' ? '👦 ' : '👧 '}</span>
              {info.name}
            </Link>
          ),
          className: STICKY_TOP_FIRST_ROW,
        },
        PLACEHOLDER_SPACE_STICKY,
      ])),
    ],
    // SECOND ROW: Rates per child
    [
      { ...PLACEHOLDER_SPACE, colSpan: 4, className: STICKY_TOP_SECOND_ROW },
      PLACEHOLDER_SPACE,
      ...flattenDeep(Children.map(({ info }) => [{
        value: `$${info.rate}/hr`,
        colSpan: 3,
        readOnly: true,
        className: STICKY_TOP_SECOND_ROW,
      }, PLACEHOLDER_SPACE])),
    ],
    // THIRD ROW: Headings for each columns
    HEADERS,
    // N ROWS: Individual days each with the hours/rate for each child
    /**
       * day: IDay -> created by the time function above
       * IDay {
       *  dayOfWeek: "Sun"
       *  month: "Dec"
       *  number: "02"
       *  year: "18"
       *  formattedDate: "120818"
       * }
       */

    ...flattenDeep(rowsInTable).map(row => (row.id !== WEEK_ENDING_ROW
      // NON WEEK ENDING ROW
      ? [
        {
          value: row.dayOfWeek,
          readOnly: true,
          type: 'dayOfWeek',
          className: 'empty-cell',
        },
        {
          value: row.month, readOnly: true, type: 'month', className: 'empty-cell',
        },
        {
          value: row.number, readOnly: true, type: 'dayOfMonth', className: 'empty-cell',
        },
        { value: dailySumAllChildren(Children, row.formattedDate), readOnly: true, format: 'curr' },
        PLACEHOLDER_SPACE,
        ...flattenDeep(Children.map(({ info, dates }) => [
          // HOURS OR CHECKBOX
          info.rateType === 'HOURLY' ? {
            value: dates[row.formattedDate] ? dates[row.formattedDate].hours : 0,
            type: 'hours',
            childId: info.id,
            row,
            savedDateInDb: dates[row.formattedDate],
          } : {
            value: dates[row.formattedDate] ? dates[row.formattedDate].hours : 0,
            type: 'hours',
            childId: info.id,
            row,
            savedDateInDb: dates[row.formattedDate],
            valueViewer: () => (
              <Checkbox
                isChecked={dates[row.formattedDate] ? dates[row.formattedDate].fixedRateChecked : false}
                onChange={onFixedCheckboxChange({
                  childId: info.id,
                  ...row,
                  savedDateInDb: dates[row.formattedDate],
                })}
              />
            ),
          },
          // PAID
          {
            value: (() => {
              if (dates[row.formattedDate]) {
                return info.rateType === 'HOURLY'
                  ? info.rate * dates[row.formattedDate].hours
                  : info.rate;
              }
              return 0;
            })(),
            type: 'paid',
            id: info.id,
            formattedDate: row.formattedDate,
            format: 'curr',
            readOnly: true,
          },
          // NOTES
          {
            value: dates[row.formattedDate] ? dates[row.formattedDate].notes : '', type: 'notes', id: info.id, formattedDate: row.formattedDate,
          },
          PLACEHOLDER_SPACE,
        ])),
      ]
      // WEEK ENDING ROW
      : [
        ...row.columns,
      ]
    )),
  ];
};
