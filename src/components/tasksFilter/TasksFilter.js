import './TasksFilter.css';

function TasksFilter({ children, selected, onFilterChange }) {
  const selectedClass = selected ? 'selected' : null;

  return (
    <button type="button" className={`button ${selectedClass}`} onClick={() => onFilterChange()}>
      {children}
    </button>
  );
}

export default TasksFilter;
