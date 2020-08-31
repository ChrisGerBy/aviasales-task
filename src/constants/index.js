import { add, format, parseISO } from 'date-fns';

export const transferFilter = {
  title: 'Количество пересадок',
  items: {
    ALL: { id: '1', title: 'Все', value: 'ALL' },
    NO_TRANSFERS: {
      id: '2',
      title: 'Без пересадок',
      value: 'NO_TRANSFERS',
      number: 0,
    },
    ONE_TRANSFER: {
      id: '3',
      title: '1 пересадка',
      value: 'ONE_TRANSFER',
      number: 1,
    },
    TWO_TRANSFERS: {
      id: '4',
      title: '2 пересадки',
      value: 'TWO_TRANSFERS',
      number: 2,
    },
    THREE_TRANSFERS: {
      id: '5',
      title: '3 пересадки',
      value: 'THREE_TRANSFERS',
      number: 3,
    },
  },
};

export const filterButtons = {
  CHEAPEST: {
    id: '1',
    label: 'Самый дешевый',
    value: 'CHEAPEST',
    getSortProp: (obj) => obj.price,
  },
  FASTEST: {
    id: '2',
    label: 'Самый быстрый',
    value: 'FASTEST',
    getSortProp: (obj) => obj.segments[0].duration + obj.segments[1].duration,
  },
};

export const formatTicket = (ticket) => {
  const { segments } = ticket;

  const formattedSegments = segments.map((segment) => {
    const { duration, date } = segment;

    const startDate = parseISO(date);
    const endDate = add(startDate, { minutes: duration });
    const flightStart = format(startDate, 'hh:mm');
    const flightEnd = format(endDate, 'hh:mm');

    const differenceArr = (duration / 60).toString().split('.');
    const durationHours = differenceArr[0];
    const durationMinutes = Math.round(+`0.${differenceArr[1]}` * 60);

    return {
      ...segment,
      flightStart,
      flightEnd,
      durationHours,
      durationMinutes,
    };
  });

  return { ...ticket, segments: formattedSegments };
};
