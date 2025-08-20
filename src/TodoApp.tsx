import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const newTodo: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, newTodo]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container p-4 max-w-md mx-auto">
      <h1 className="todo-title text-xl font-bold mb-4"></h1>
      

      <div className="todo-input-container flex gap-2 mb-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Lisää tehtävä..."
          className="todo-input border p-2 flex-1"
        />
        <button
          onClick={handleAddTask}
          className="todo-add-button bg-blue-500 text-white px-4 py-2 rounded"
        >
          Lisää
        </button>
      </div>

      <ul className="todo-list space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="todo-item flex items-center justify-between border p-2 rounded"
          >
            <div className="todo-task flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="todo-checkbox"
              />
              <span
                className={`todo-text ${task.completed ? "line-through" : ""}`}
              >
                {task.text}
              </span>
            </div>

            <button
              className="todo-delete-button text-red-600"
              onClick={() => deleteTask(task.id)}
            >
              Poista
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

