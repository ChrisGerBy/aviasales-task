import React from 'react';
import TicketCard from '../TicketCard';

import './TicketsBlock.styles.css';

const TicketsBlock = ({ tickets }) => {
  return (
    <div className={'TicketsBlock'}>
      {tickets.map((ticket) => (
        <TicketCard key={`${ticket.price}${ticket.carrier}`} {...ticket} />
      ))}
    </div>
  );
};

export default TicketsBlock;
