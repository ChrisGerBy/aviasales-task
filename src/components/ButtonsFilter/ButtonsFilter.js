import React  from 'react';
import { ButtonGroup } from 'reactstrap';
import Button from '../Button';

import './ButtonsFilter.styles.css';

const ButtonsFilter = ({ buttons = [], selectedFilter, onButtonClick }) => {
    return (
        <ButtonGroup className={"ButtonsFilter"}>
        {buttons.map(({id, label, value }) => (
            <Button key={id} onClick={() => onButtonClick(value)} active={selectedFilter === value}>
                {label}
            </Button>))}
        </ButtonGroup>
    );
}

export default ButtonsFilter;