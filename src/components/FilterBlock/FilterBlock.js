import React from 'react';
import { Input, Label } from 'reactstrap';
import './FilterBlock.styles.css';

const FilterBlock = ({ filters = [], filterTitle = '', checkedFiltersValues = [], onFilter }) => {

    return (
        <div className={"FilterBlock"}>
            <h3>{filterTitle}</h3>
            {filters.map(({ id, title, value }) => (
                <Label check key={id} className={"FilterBlock__label"}>
                    <Input
                        type="checkbox"
                        id={id}
                        onChange={() => onFilter(value)}
                        checked={checkedFiltersValues.includes(value)}
                    />
                    <span className={'FilterBlock__checkmark'} />
                    <span className={'FilterBlock__title'}>{title}</span>
                </Label>
                ))
            }
        </div>
    )
}

export default FilterBlock;