import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  XMarkIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  TagIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  // RocketIcon,
  ChevronDownIcon,
  ListBulletIcon,
  ArchiveBoxIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design new landing page",
      description: "Create a modern and responsive design",
      priority: "high",
      dueDate: "2024-01-20",
      status: "in-progress",
      category: "Design",
      subtasks: 3,
      completed: 1,
    },
    {
      id: 2,
      title: "Review client feedback",
      description: "Go through and prioritize feedback",
      priority: "medium",
      dueDate: "2024-01-18",
      status: "pending",
      category: "Review",
      subtasks: 0,
      completed: 0,
    },
    {
      id: 3,
      title: "Deploy to production",
      description: "Push latest changes to production",
      priority: "high",
      dueDate: "2024-01-17",
      status: "completed",
      category: "Development",
      subtasks: 5,
      completed: 5,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "General",
  });

  const handleAddTask = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      category: "General",
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setFormData(task);
    setEditingId(task.id);
    setShowModal(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      setTasks(
        tasks.map((t) =>
          t.id === editingId ? { ...formData, id: editingId } : t
        )
      );
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
        status: "pending",
        subtasks: 0,
        completed: 0,
      };
      setTasks([newTask, ...tasks]);
    }

    setShowModal(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "completed" ? "pending" : "completed",
            }
          : t
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  const getPriorityColor = (priority) => {
    if (priority === "high")
      return "bg-red-500/20 text-red-400 border-red-500/50";
    if (priority === "medium")
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    return "bg-green-500/20 text-green-400 border-green-500/50";
  };

  const getStatusIcon = (status) => {
    if (status === "completed") return "✓";
    if (status === "in-progress") return "⏳";
    return "◯";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-gray-900/80 border-b border-gray-800 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <RocketLaunchIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <BellIcon className="h-6 w-6 text-gray-400" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <UserCircleIcon className="h-6 w-6 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-sm font-semibold">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors text-sm flex items-center gap-2">
                    <Cog6ToothIcon className="h-4 w-4" />
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors text-sm text-red-400 flex items-center gap-2 border-t border-gray-800">
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome Back! 👋</h1>
              <p className="text-gray-400">
                You have {stats.pending} pending and {stats.inProgress} in-progress tasks
              </p>
            </div>
            <button
              onClick={handleAddTask}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              New Task
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Tasks",
                value: stats.total,
                icon: ListBulletIcon,
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Completed",
                value: stats.completed,
                icon: CheckCircleIcon,
                color: "from-green-500 to-emerald-500",
              },
              {
                label: "In Progress",
                value: stats.inProgress,
                icon: ClockIcon,
                color: "from-yellow-500 to-orange-500",
              },
              {
                label: "Pending",
                value: stats.pending,
                icon: ExclamationTriangleIcon,
                color: "from-red-500 to-pink-500",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
              >
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg w-fit mb-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filters and Search */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder-gray-500"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <FunnelIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-white appearance-none cursor-pointer"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500">📊</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-white appearance-none cursor-pointer"
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Tasks List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-12">
              <SparklesIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? "Try adjusting your search" : "Create a new task to get started"}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleAddTask}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all inline-flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Create Task
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-gray-900/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          task.status === "completed"
                            ? "bg-cyan-500 border-cyan-500"
                            : "border-gray-600 hover:border-cyan-500"
                        }`}
                      >
                        {task.status === "completed" && (
                          <CheckIcon className="h-4 w-4 text-white" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3
                            className={`text-lg font-semibold ${
                              task.status === "completed"
                                ? "line-through text-gray-600"
                                : ""
                            }`}
                          >
                            {task.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <p className="text-gray-400 text-sm mb-3">
                          {task.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-500">
                            <CalendarIcon className="h-4 w-4" />
                            {formatDate(task.dueDate)}
                          </div>

                          <div className="flex items-center gap-2 text-gray-500">
                            <TagIcon className="h-4 w-4" />
                            {task.category}
                          </div>

                          {task.subtasks > 0 && (
                            <div className="flex items-center gap-2 text-gray-500">
                              <ListBulletIcon className="h-4 w-4" />
                              {task.completed}/{task.subtasks}
                            </div>
                          )}

                          {task.status === "in-progress" && (
                            <div className="flex items-center gap-2 text-blue-400 ml-auto">
                              <ClockIcon className="h-4 w-4 animate-spin" />
                              In Progress
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-cyan-400"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Task" : "Create New Task"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter task title"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter task description"
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white appearance-none cursor-pointer"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., Design, Development, Review"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTask}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/50 rounded-lg font-semibold transition-all"
                >
                  {editingId ? "Update Task" : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;