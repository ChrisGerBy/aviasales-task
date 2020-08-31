import React from 'react';
import './FlightInfoTable.styles.css';

const FlightInfoTable = ({
  data: {
    origin = '',
    destination = '',
    stops = [],
    flightStart,
    flightEnd,
    durationHours,
    durationMinutes,
  },
}) => {
  const stopsLength = stops.length;
  const addition = stopsLength === 1 ? 'пересадка' : 'пересадки';

  const columns = {
    direction: `${origin} - ${destination}`,
    time: 'В пути',
    transfer: stopsLength ? `${stopsLength} ${addition}` : 'Без пересадок',
  };

  const tableData = {
    direction: `${flightStart} - ${flightEnd}`,
    time: `${durationHours}ч${durationMinutes ? ` ${durationMinutes}м` : ''}`,
    transfer: stops.join(', '),
  };

  return (
    <table className={'FlightInfoTable'}>
      <thead>
        <tr>
          {Object.values(columns).map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.keys(columns).map((col) => {
            return <td key={tableData[col]}>{tableData[col]}</td>;
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default FlightInfoTable;
