/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { TodoType } from '../../types/todoType';

type Props = {
  todo: TodoType,
  removeTask: (value: number) => void;
  toggleTask: (value: number) => void;
  onEditTitle: (todo: TodoType) => void,
};

export const Todo: React.FC<Props> = ({
  todo,
  removeTask,
  toggleTask,
  onEditTitle,
}) => {
  const { title, name, completed, id, time } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [timer, setTime] = useState(time);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const  modifyTodo = () => {
    if (!value) {
      setValue(title);
      setIsEditing(false);

      return;
    }

    const modifiedTodo = {
      ...todo,
      title: value,
    };

    onEditTitle(modifiedTodo);
    setTime(new Date().toISOString().slice(0, 10))
    setIsEditing(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setValue(title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      const modifiedTodo = {
        ...todo,
        title: value,
      };
  
      onEditTitle(modifiedTodo);
      setTime(new Date().toISOString().slice(0, 10))
      setIsEditing(false);
    } 
  };

  return (
    <>
      <li
        className={classNames(
          {
            completed,
          },
          {
            editing: isEditing && !completed,
          }
        )}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={completed}
            onChange={() => toggleTask(id)}
          />
          <label 
            onDoubleClick={() => setIsEditing(true)}
            role="presentation"
            onKeyDown={() => {}}
          >
            <div className="box">
              <span className="box_item">{name}</span>

              <span className="box_item">{title}</span>
              
              <span className="box_item">{timer}</span>
            </div>
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => removeTask(id)}
          />
        </div>
        <input 
          type="text" 
          className="edit" 
          value={value}
          onChange={changeTitle}
          onBlur={modifyTodo}
          onKeyDown={onKeyDown}
          ref={input => input && input.focus()}
          />
      </li>
    </>
  );
};
