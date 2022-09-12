import React from 'react';
import { TodoType } from '../../types/todoType';
import { useForm } from "react-hook-form";

type Props = {
  addTask: (newItem: TodoType) => void;
};

export const TodoForm: React.FC<Props> = ({ addTask }) => {
  const {
    register, 
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    
    const newItem = {
      id: +new Date(),
      name: data.name,
      title: data.todo,
      completed: false,
      time: new Date().toISOString().slice(0, 10),
    };
  
    addTask(newItem);
    reset({
      todo: '',
      name: '',
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: true })}
        type="text"
        className="new-todo"
        placeholder="What's your name?"
      />
      <input
         {...register("todo", { required: true })}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
      <button 
        type="submit"
        style={{ display : "none" }} 
      >
        Submit
      </button>
    </form>
  );
};
