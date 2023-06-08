import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

function NewTaskForm({ addTask }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (!label.trim().length > 0) {
      alert('вы пытаетесь добавить пробел(ы)!');
      return;
    }
    if (label.trim().length > 0) {
      addTask(label, +min || 0, +sec || 0);
      setLabel('');
      setMin('');
      setSec('');
    }
  };
  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <button type="submit" aria-label="sub" />
      <input
        type="text"
        className="new-todo"
        placeholder="next task"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        name="adding a task"
        minLength={1}
        maxLength={30}
        required
      />
      <input
        onChange={(e) => setMin(e.target.value)}
        value={min}
        name="min"
        max="60"
        min="0"
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        required
      />
      <input
        onChange={(e) => setSec(e.target.value)}
        value={sec}
        name="sec"
        max="60"
        min="0"
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        required
      />
    </form>
  );
}

export default NewTaskForm;

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};
