import NewTaskForm from '../newTaskForm/NewTaskForm';
import './Header.css';

function Header(props) {
  const { addTask, maxInput } = props;
  return (
    <header>
      <h1 className="header">Дела</h1>
      <NewTaskForm addTask={addTask} maxInput={maxInput} />
    </header>
  );
}

export default Header;
