"use client";

import { useState, useEffect } from "react";
import { getTasks, createTask, completeTask, deleteTask } from "../services/api";
import { Task } from "../types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

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

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setActionError(null);

    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) {
      setFormError("Task title is required");
      return;
    }

    try {
      setSubmitting(true);
      const response = await createTask(trimmedTitle);
      if (response.success) {
        setNewTaskTitle("");
        const fetchResponse = await getTasks();
        if (fetchResponse.success && fetchResponse.data) {
          setTasks(fetchResponse.data);
        } else {
          setError(fetchResponse.message || "Failed to load updated tasks.");
        }
      } else {
        setFormError(response.message || "Failed to create task.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteTask = async (id: string, currentlyCompleted: boolean) => {
    if (currentlyCompleted) return;
    setActionError(null);
    setFormError(null);

    try {
      setCompletingTaskId(id);
      const response = await completeTask(id);
      if (response.success) {
        const fetchResponse = await getTasks();
        if (fetchResponse.success && fetchResponse.data) {
          setTasks(fetchResponse.data);
        } else {
          setActionError(fetchResponse.message || "Failed to load updated tasks.");
        }
      } else {
        setActionError(response.message || "Failed to complete task.");
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to connect to the server.");
    } finally {
      setCompletingTaskId(null);
    }
  };

  const handleDeleteTask = async (id: string) => {
    setActionError(null);
    setFormError(null);

    try {
      setDeletingTaskId(id);
      const response = await deleteTask(id);
      if (response.success) {
        const fetchResponse = await getTasks();
        if (fetchResponse.success && fetchResponse.data) {
          setTasks(fetchResponse.data);
        } else {
          setActionError(fetchResponse.message || "Failed to load updated tasks.");
        }
      } else {
        setActionError(response.message || "Failed to delete task.");
      }
    } catch (err: any) {
      setActionError(err.message || "Failed to connect to the server.");
    } finally {
      setDeletingTaskId(null);
    }
  };

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
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <header className="border-b border-border-custom bg-bg-secondary px-4 py-4 sm:px-6">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-text-emphasis">
            Mini Task Manager
          </h1>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="px-3 py-1.5 border border-border-custom rounded text-xs font-semibold text-text-emphasis hover:bg-bg-primary focus:outline-none focus:ring-2 focus:ring-solarized-blue"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-xl mx-auto py-8 px-4 sm:px-6">
        {/* Error Alert Box */}
        {(error || formError || actionError) && (
          <div
            role="alert"
            className="mb-6 p-4 border border-solarized-red bg-bg-secondary text-solarized-red rounded text-sm"
          >
            <p className="font-bold mb-1">Error</p>
            <p>{formError || actionError || error}</p>
          </div>
        )}

        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2 mb-8">
          <label htmlFor="task-input" className="sr-only">
            New task title
          </label>
          <input
            id="task-input"
            type="text"
            value={newTaskTitle}
            disabled={submitting}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 px-4 py-2 border border-border-custom rounded bg-bg-secondary text-text-emphasis placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-solarized-blue disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={submitting}
            aria-label="Add new task"
            className="px-5 py-2 bg-solarized-blue hover:bg-solarized-cyan text-bg-primary font-bold rounded focus:outline-none focus:ring-2 focus:ring-solarized-blue disabled:opacity-50 shrink-0"
          >
            {submitting ? "Adding..." : "Add Task"}
          </button>
        </form>

        {loading ? (
          <div className="text-center py-6 text-text-muted">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 px-4 text-text-muted border border-dashed border-border-custom rounded bg-bg-secondary">
            <p className="font-semibold text-text-emphasis mb-1">No tasks available.</p>
            <p className="text-sm">Create your first task above.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => {
              const isCompleting = completingTaskId === task._id;
              const isDeleting = deletingTaskId === task._id;

              return (
                <li
                  key={task._id}
                  className="flex items-start justify-between gap-4 p-4 bg-bg-secondary border border-border-custom rounded hover:border-text-muted"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      type="button"
                      disabled={task.completed || isCompleting || isDeleting}
                      onClick={() => handleCompleteTask(task._id, task.completed)}
                      aria-label={task.completed ? "Task is completed" : `Mark task as completed`}
                      className="text-xl text-solarized-blue select-none focus:outline-none focus:ring-2 focus:ring-solarized-blue rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {task.completed ? "☑" : "☐"}
                    </button>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span
                        className={`text-text-emphasis break-words whitespace-normal leading-relaxed ${
                          task.completed ? "line-through text-text-muted" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      {isCompleting && (
                        <span className="text-xs text-text-muted mt-0.5">Completing...</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isDeleting || isCompleting}
                    onClick={() => handleDeleteTask(task._id)}
                    aria-label={`Delete task`}
                    className="px-3 py-1.5 text-xs font-semibold border border-solarized-red text-solarized-red rounded hover:bg-solarized-red hover:text-bg-primary focus:outline-none focus:ring-2 focus:ring-solarized-red disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
