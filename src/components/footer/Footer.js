import './Footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../tasksFilter/TasksFilter';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

function Footer({ todoCount, deleteCompletedItem, filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttonsEls = buttons.map(({ name, label }) => (
    <li key={name}>
      <TasksFilter
        selected={filter === name}
        onFilterChange={() => {
          onFilterChange(name);
        }}
      >
        {label}
      </TasksFilter>
    </li>
  ));

  return (
    <footer className="footer">
      <span className="todo-count">{`${todoCount} шт осталось`}</span>
      <ul className="filters">{buttonsEls}</ul>
      <button type="button" className="clear-completed" onClick={deleteCompletedItem}>
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
