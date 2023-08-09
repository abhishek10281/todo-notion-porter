import React from "react";
import { useForm } from "react-hook-form";

export default function App({ addTodo, removeDuplicate }) {
  const { register, handleSubmit, watch, formState } = useForm({
    mode: "onChange"
  });

  const onSubmit = ({ newTodo }) => {
    addTodo(newTodo);
  };

  const removeDuplicates = () => {
    removeDuplicate();
  };

  console.log(watch("newTodo")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("newTodo", { required: true })} />
        <span>&nbsp;</span>
        <button disabled={!formState.isValid} onClick={handleSubmit(onSubmit)}>
          Add
        </button>
        <button onClick={handleSubmit(removeDuplicates)}>
          Remove Duplicates
        </button>
      </div>
    </form>
  );
}
