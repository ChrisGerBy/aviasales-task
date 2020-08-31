import React from 'react';
import FilterBlock from './components/FilterBlock';
import TicketsBlock from './components/TicketsBlock';
import ButtonsFilter from './components/ButtonsFilter';

import { ReactComponent as LogoIcon } from './logo.svg';
import { filterButtons, transferFilter, formatTicket } from './constants';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.transferValues = Object.values(transferFilter.items).map(
      (item) => item.value
    );
    this.allTickets = [];

    this.state = {
      checkedFiltersValues: this.transferValues,
      searchId: '',
      selectedFilter: filterButtons.CHEAPEST.value,
      displayedTickets: this.allTickets,
      filters: [],
      isDataLoading: true,
    };
  }

  componentDidMount() {
    fetch('https://front-test.beta.aviasales.ru/search')
      .then((res) => res.json())
      .then(({ searchId }) =>
        this.setState({ searchId }, () => this.loadTickets())
      );
  }

  loadTickets = () => {
    const { searchId } = this.state;
    fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
      .then((res) => res.json())
      .then(({ tickets }) => {
        this.allTickets = tickets.map((ticket) => formatTicket(ticket));

        this.sortTickets({ tickets: this.allTickets });
      });
  };

  sortTickets = ({ tickets }) => {
    const { selectedFilter } = this.state;

    const sortedTickets = tickets.sort((a, b) => {
      const { getSortProp } = filterButtons[selectedFilter];
      const aVal = getSortProp(a);
      const bVal = getSortProp(b);

      if (aVal > bVal) {
        return 1;
      }

      if (aVal < bVal) {
        return -1;
      }

      return 0;
    });
    this.setState({ displayedTickets: sortedTickets, isDataLoading: false });
  };

  filterTickets() {
    const { checkedFiltersValues } = this.state;

    const selectedFiltersNumbers = checkedFiltersValues.map(
      (val) => transferFilter.items[val].number
    );
    const isAnyFilterSelected = !!checkedFiltersValues.length;

    if (!isAnyFilterSelected) {
      this.setState({ displayedTickets: [] });
      return;
    }

    const filteredTickets = this.allTickets.filter((ticket) => {
      const stopsLength1 = ticket.segments[0].stops.length;
      const stopsLength2 = ticket.segments[1].stops.length;
      const isStopLengthSelected =
        selectedFiltersNumbers.includes(stopsLength1) &&
        selectedFiltersNumbers.includes(stopsLength2);

      return isStopLengthSelected;
    });

    this.sortTickets({ tickets: filteredTickets });
  }

  handleChangeButtonFilter = (value) => {
    const { displayedTickets } = this.state;
    this.setState({ selectedFilter: value }, () =>
      this.sortTickets({ tickets: displayedTickets })
    );
  };

  handleChangeTransferFilter = (value) => {
    const { checkedFiltersValues } = this.state;

    const allFilterValue = transferFilter.items.ALL.value;
    const isAllFilterSelected = value === allFilterValue;
    const foundFilterIdIndex = checkedFiltersValues.findIndex(
      (filterId) => value === filterId
    );
    const isIdInArr = foundFilterIdIndex !== -1;

    let newValues = [];
    if (isAllFilterSelected) {
      newValues = isIdInArr ? [] : this.transferValues;
    } else {
      newValues = isIdInArr
        ? checkedFiltersValues.filter(
            (filterId) => ![value, allFilterValue].includes(filterId)
          )
        : [...checkedFiltersValues, value];

      if (
        newValues.length ===
        Object.entries(transferFilter.items).length - 1
      ) {
        newValues = this.transferValues;
      }
    }

    this.setState({ checkedFiltersValues: newValues }, () =>
      this.filterTickets()
    );
  };

  render() {
    const {
      checkedFiltersValues,
      selectedFilter,
      displayedTickets,
      isDataLoading,
    } = this.state;

    return (
      <div className="App">
        <LogoIcon />
        <div className={'App__content'}>
          <FilterBlock
            filters={Object.values(transferFilter.items)}
            filterTitle={transferFilter.title}
            checkedFiltersValues={checkedFiltersValues}
            onFilter={this.handleChangeTransferFilter}
          />
          <div className={'App__filter-tickets'}>
            <ButtonsFilter
              buttons={Object.values(filterButtons)}
              selectedFilter={selectedFilter}
              onButtonClick={this.handleChangeButtonFilter}
            />
            {!isDataLoading && !displayedTickets.length ? (
              <p>Билеты не найдены</p>
            ) : (
              <TicketsBlock
                tickets={displayedTickets}
                isDataLoading={isDataLoading}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
