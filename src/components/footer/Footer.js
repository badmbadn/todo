import './Footer.css';
import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasksFilter/TasksFilter';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

function Footer({ todoCount, deleteCompletedItem, filter, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} шт осталось</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" onClick={deleteCompletedItem}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  deleteCompletedItem: PropTypes.func,
};

Footer.defaultProps = {
  filter: 'all',
  onFilterChange: throwError.bind(this, 'onFilterChange'),
  deleteCompletedItem: throwError.bind(this, 'deleteCompletedItem'),
};

export default Footer;
