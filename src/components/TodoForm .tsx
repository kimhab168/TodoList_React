import React from "react";
import TodoList from "./TodoList";
import { data } from "./tasks";

interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

const TodoForm: React.FC = () => {
  const [lastText, setText] = React.useState("");
  const [tasks, setTasks] = React.useState<Task[]>(data);

  function getText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function getIDTask(id: number): void {
    const AfterRemove = tasks.filter((u) => u.id !== id);
    setTasks(AfterRemove);
  }

  const getIDEdit = (id: number, newText: string): void => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  function addTask() {
    if (lastText !== "") {
      const newTask: Task = {
        id: tasks.length + 1,
        text: lastText,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setText("");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-4">To Do Lists</h2>
      <div className="w-full max-w-lg mb-4">
        <input
          onChange={getText}
          value={lastText}
          placeholder="Add Task..."
          type="text"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={addTask}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <TodoList
          {...task}
          key={task.id}
          getID={getIDTask}
          editID={getIDEdit}
        />
      ))}
    </div>
  );
};

export default TodoForm;
