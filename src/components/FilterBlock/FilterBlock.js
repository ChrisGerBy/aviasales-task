import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';
import { ReactComponent as CrossIcon } from '../../cross-icon.svg';

import './FilterBlock.styles.css';

const FilterBlock = ({ filters = [], filterTitle = '', checkedFiltersValues = [], onFilter }) => {
    const [isFilterBlockVisible, setIsFilterBlockVisible] = useState(false);

    const toggleFilterBLock = () => {
        setIsFilterBlockVisible(!isFilterBlockVisible);
    }

    return (
    <div className={'FilterBlock'}>
            <div className={`FilterBlock__filters ${isFilterBlockVisible ? 'FilterBlock__filters--visible' :  'FilterBlock__filters--hidden'}`}>
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
                <CrossIcon className={'FilterBlock__cross-icon'} onClick={toggleFilterBLock}/>
            </div>
            <button className={'FilterBlock__panel'} onClick={toggleFilterBLock}>
               <p className={'FilterBlock__panel-text'}>Фильтры</p>
            </button>
        </div>
    )
}

export default FilterBlock;