import React from 'react';
import FlightInfoTable from "../FlightInfoTable";

import './TicketCard.styles.css';

const TicketCard = ({ carrier, price, segments }) => {
    const formattedPrice = `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}  Р`;

    return (
        <div key={`${carrier}${price}`} className={'TicketCard__ticket'}>
            <div className={'TicketCard___price-logo'}>
                <p className={'TicketCard__ticket--price'}>{formattedPrice}</p>
                <div className={'TicketCard___image'}>
                    <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt={`${carrier}-icon`}/>
                </div>
            </div>
            <div className={'FlightBlock__tables'}>
                <FlightInfoTable data={segments[0]} />
                <FlightInfoTable data={segments[1]} />
            </div>
        </div>
        )

}

export default TicketCard;