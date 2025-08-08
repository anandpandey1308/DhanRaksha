"use client";
import React, { useState, useEffect } from "react";
import { taskApi, Task, TaskStats } from "./api";

// Phase configuration for UI display
const phaseConfig: Record<string, { icon: string; color: string }> = {
  "phase-0": { icon: "🔧", color: "from-indigo-500 to-indigo-700" },
  "phase-1": { icon: "🔐", color: "from-blue-500 to-blue-700" },
  "phase-2": { icon: "💰", color: "from-green-500 to-green-700" },
  "phase-3": { icon: "📊", color: "from-purple-500 to-purple-700" },
  "phase-4": { icon: "🎯", color: "from-pink-500 to-pink-700" },
  "phase-5": { icon: "📈", color: "from-cyan-500 to-cyan-700" },
  "phase-6": { icon: "🤖", color: "from-orange-500 to-orange-700" },
  "phase-7": { icon: "📋", color: "from-teal-500 to-teal-700" },
  "phase-8": { icon: "🛡️", color: "from-red-500 to-red-700" },
  "phase-9": { icon: "✨", color: "from-violet-500 to-violet-700" },
};

const TrackingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Group tasks by category
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const categories = Object.keys(groupedTasks).map((category) => ({
    category,
    phase: groupedTasks[category][0]?.phase || "phase-0",
    items: groupedTasks[category].sort((a, b) => a.order - b.order),
  }));

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const [tasksData, statsData] = await Promise.all([
        taskApi.getAllTasks(),
        taskApi.getTaskStats(),
      ]);
      setTasks(tasksData);
      setStats(statsData);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load tasks";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = async (taskId: string, done: boolean) => {
    try {
      const updatedTask = await taskApi.updateTask(taskId, {
        done,
        updatedBy: "user", // You can replace this with actual user info
      });

      // Update local state
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );

      // Refresh stats
      const newStats = await taskApi.getTaskStats();
      setStats(newStats);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update task";
      setError(errorMessage);
    }
  };

  const initializeTasks = async () => {
    try {
      await taskApi.initializeTasks();
      await loadTasks();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to initialize tasks";
      setError(errorMessage);
    }
  };

  const getProgressPercentage = (items: Task[]) => {
    const completed = items.filter((item) => item.done).length;
    return Math.round((completed / items.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <button
            onClick={loadTasks}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
          {tasks.length === 0 && (
            <button
              onClick={initializeTasks}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg ml-4"
            >
              Initialize Tasks
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative px-6 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              DhanRaksha Development
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Track the progress of your financial management platform
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-full p-2 inline-block">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full px-6 py-3">
                <span className="text-white font-semibold text-lg">
                  {stats?.percentage || 0}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((taskCategory, index) => {
            const progress = getProgressPercentage(taskCategory.items);
            const phaseInfo = phaseConfig[taskCategory.phase] || phaseConfig["phase-0"];

            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === index ? null : index
                  )
                }
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${phaseInfo.color} flex items-center justify-center text-2xl`}
                    >
                      {phaseInfo.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {taskCategory.category}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {taskCategory.items.filter((item) => item.done).length} of{" "}
                        {taskCategory.items.length} completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {progress}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${phaseInfo.color} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Tasks List */}
                <div
                  className={`space-y-3 transition-all duration-300 ${
                    selectedCategory === index
                      ? "max-h-none"
                      : "max-h-40 overflow-hidden"
                  }`}
                >
                  {taskCategory.items.map((task) => (
                    <div
                      key={task._id}
                      className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        task.done
                          ? "bg-green-500/10 border border-green-500/20"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskUpdate(task._id, !task.done);
                          }}
                          className="focus:outline-none"
                        >
                          {task.done ? (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-400 rounded-full hover:border-gray-300 transition-colors"></div>
                          )}
                        </button>
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            task.done
                              ? "text-green-400 line-through"
                              : "text-white"
                          }`}
                        >
                          {task.name}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {task.description}
                        </p>
                        {task.completedAt && (
                          <p className="text-xs text-green-400 mt-1">
                            Completed:{" "}
                            {new Date(task.completedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expand/Collapse Button */}
                <button
                  className="w-full mt-4 text-center text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(
                      selectedCategory === index ? null : index
                    );
                  }}
                >
                  {selectedCategory === index ? "Show Less" : "Show All Tasks"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {stats.completed}
                </div>
                <div className="text-gray-400">Completed Tasks</div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {stats.total - stats.completed}
                </div>
                <div className="text-gray-400">Remaining Tasks</div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {stats.byPhase.length}
                </div>
                <div className="text-gray-400">Phases</div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {stats.total}
                </div>
                <div className="text-gray-400">Total Tasks</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
