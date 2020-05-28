import moment from 'moment';

export function getDaysAgo(date: Date): number {
  const today = moment().utc().startOf('day');
  return today.diff(moment(date).startOf('day'), 'days');
}

export const calcDaysDiff = (startDate: Date, endDate: Date): number => {
  const startMoment = moment(startDate).utc().startOf('day');
  const endMoment = moment(endDate).startOf('day');
  return startMoment.diff(endMoment, 'days');
}
