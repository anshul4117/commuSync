"use client";

import { useState, useEffect } from "react";
import { getTasks } from "../services/api";
import { Task } from "../types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Initialize theme from localStorage or system setting
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await getTasks();
        if (response.success && response.data) {
          setTasks(response.data);
        } else {
          setError(response.message || "Failed to load tasks.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header section */}
      <header className="border-b border-border-custom bg-bg-secondary px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-emphasis">
          Mini Task Manager
        </h1>
        <button
          type="button"
          onClick={toggleTheme}
          className="px-3 py-1.5 border border-border-custom rounded text-xs font-semibold text-text-emphasis hover:bg-bg-primary focus:outline-none"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      {/* Main content wrapper */}
      <main className="max-w-md mx-auto py-10 px-4">
        {/* Task input form */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 px-4 py-2 border border-border-custom rounded bg-bg-secondary text-text-emphasis placeholder-text-muted focus:outline-none focus:border-solarized-blue"
          />
          <button
            type="button"
            className="px-4 py-2 bg-solarized-blue hover:bg-solarized-cyan text-bg-primary font-semibold rounded focus:outline-none"
          >
            Add Task
          </button>
        </div>

        {/* Tasks display area */}
        {loading ? (
          <div className="text-center py-4 text-text-muted">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-solarized-red">{error}</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-text-muted border border-dashed border-border-custom rounded-lg bg-bg-secondary">
            No tasks available.
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center gap-3 p-3 bg-bg-secondary border border-border-custom rounded hover:border-text-muted"
              >
                <span className="text-xl text-solarized-blue select-none">
                  {task.completed ? "☑" : "☐"}
                </span>
                <span
                  className={`text-text-emphasis ${
                    task.completed ? "line-through text-text-muted" : ""
                  }`}
                >
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
