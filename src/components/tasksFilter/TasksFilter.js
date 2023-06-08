/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classNames from 'classnames';

import './TasksFilter.css';

function TasksFilter({ filter, onFilterChange }) {
  const filters = [
    {
      name: 'all',
      label: 'All',
    },
    {
      name: 'active',
      label: 'Active',
    },
    {
      name: 'completed',
      label: 'Completed',
    },
  ];

  const filterTabs = filters.map(({ name, label }) => {
    const selectedClass = classNames({
      selected: filter === name,
    });

    return (
      <li key={name}>
        <button className={selectedClass} type="button" onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{filterTabs}</ul>;
}

export default TasksFilter;
