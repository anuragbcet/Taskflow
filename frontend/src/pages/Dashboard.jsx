import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  XMarkIcon,
  CheckIcon,
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { BACKEND_URL } from "../utils/config";

const API_URL =BACKEND_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "General",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserName(payload.email || "User");
    } catch (e) {
      setUserName("User");
    }

    fetchTasks();
  }, [navigate]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        headers: getAuthHeaders()
      });
      if (res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

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
    setFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : "",
      category: task.category,
    });
    setEditingId(task.id);
    setShowModal(true);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      if (editingId) {
        const res = await fetch(`${API_URL}/tasks/${editingId}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const updated = await res.json();
          setTasks(tasks.map(t => t.id === editingId ? updated : t));
        }
      } else {
        const res = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const newTask = await res.json();
          setTasks([newTask, ...tasks]);
        }
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setTasks(tasks.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete task");
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks(tasks.map(t => t.id === id ? updated : t));
      }
    } catch (err) {
      console.error("Failed to toggle task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <span
            onClick={() => navigate("/")}
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              cursor: "pointer"
            }}
          >
            TaskFlow
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: "0.5rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "transparent",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex"
              }}
            >
              {isDark ? <SunIcon style={{ width: 20, height: 20 }} /> : <MoonIcon style={{ width: 20, height: 20 }} />}
            </button>

            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "transparent",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem"
                }}
              >
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent)",
                  color: "var(--bg-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 600
                }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
                <ChevronDownIcon style={{ width: 14, height: 14 }} />
              </button>

              {showUserMenu && (
                <div style={{
                  position: "absolute",
                  right: 0,
                  marginTop: "0.5rem",
                  width: "200px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)"
                }}>
                  <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{userName}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#ef4444",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <ArrowRightOnRectangleIcon style={{ width: 16, height: 16 }} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: "96px", paddingBottom: "3rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                Welcome back 👋
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>
                You have {stats.pending + stats.inProgress} tasks to complete
              </p>
            </div>
            <button
              onClick={handleAddTask}
              style={{
                padding: "0.625rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "var(--accent)",
                color: "var(--bg-primary)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.375rem"
              }}
            >
              <PlusIcon style={{ width: 16, height: 16 }} />
              New Task
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem"
          }}>
            {[
              { label: "Total", value: stats.total },
              { label: "Completed", value: stats.completed },
              { label: "In Progress", value: stats.inProgress },
              { label: "Pending", value: stats.pending },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px"
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap"
          }}>
            <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
              <MagnifyingGlassIcon style={{
                position: "absolute",
                left: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: 18,
                height: 18,
                color: "var(--text-muted)"
              }} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem 0.625rem 2.5rem",
                  fontSize: "0.875rem",
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                  outline: "none"
                }}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: "0.625rem 2rem 0.625rem 0.875rem",
                fontSize: "0.875rem",
                backgroundColor: "var(--input-bg)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text-primary)",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {filteredTasks.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "var(--text-muted)"
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📝</div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                No tasks found
              </h3>
              <p style={{ fontSize: "0.9375rem" }}>
                {searchTerm ? "Try a different search" : "Create a task to get started"}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    padding: "1rem 1.25rem",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    transition: "border-color 0.15s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                >
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    style={{
                      marginTop: "2px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: task.status === "completed" ? "none" : "2px solid var(--border)",
                      backgroundColor: task.status === "completed" ? "var(--accent)" : "transparent",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {task.status === "completed" && (
                      <CheckIcon style={{ width: 12, height: 12, color: "var(--bg-primary)" }} />
                    )}
                  </button>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.25rem" }}>
                      <span style={{
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        textDecoration: task.status === "completed" ? "line-through" : "none",
                        color: task.status === "completed" ? "var(--text-muted)" : "var(--text-primary)"
                      }}>
                        {task.title}
                      </span>
                      <span style={{
                        fontSize: "0.6875rem",
                        fontWeight: 500,
                        padding: "0.125rem 0.5rem",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.025em",
                        backgroundColor: task.priority === "high" ? (isDark ? "rgba(239, 68, 68, 0.15)" : "rgba(239, 68, 68, 0.1)") :
                          task.priority === "medium" ? (isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.1)") :
                            (isDark ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.1)"),
                        color: task.priority === "high" ? "#ef4444" :
                          task.priority === "medium" ? "#f59e0b" : "#22c55e"
                      }}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && (
                      <p style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-muted)",
                        marginBottom: "0.5rem"
                      }}>
                        {task.description}
                      </p>
                    )}
                    <div style={{
                      display: "flex",
                      gap: "1rem",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)"
                    }}>
                      {task.dueDate && <span>{formatDate(task.dueDate)}</span>}
                      <span>{task.category}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    <button
                      onClick={() => handleEditTask(task)}
                      style={{
                        padding: "0.375rem",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "var(--text-muted)",
                        cursor: "pointer"
                      }}
                    >
                      <PencilIcon style={{ width: 16, height: 16 }} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{
                        padding: "0.375rem",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "var(--text-muted)",
                        cursor: "pointer"
                      }}
                    >
                      <TrashIcon style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          zIndex: 100
        }}>
          <div style={{
            width: "100%",
            maxWidth: "480px",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden"
          }}>
            <div style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                {editingId ? "Edit Task" : "New Task"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "0.375rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "var(--text-muted)"
                }}
              >
                <XMarkIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <form onSubmit={handleSaveTask} style={{ padding: "1.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Task title"
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.875rem",
                    fontSize: "0.875rem",
                    backgroundColor: "var(--input-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add a description"
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.875rem",
                    fontSize: "0.875rem",
                    backgroundColor: "var(--input-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    outline: "none",
                    resize: "none"
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.875rem",
                      fontSize: "0.875rem",
                      backgroundColor: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--text-primary)",
                      outline: "none"
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.875rem",
                      fontSize: "0.875rem",
                      backgroundColor: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--text-primary)",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Work, Personal"
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.875rem",
                    fontSize: "0.875rem",
                    backgroundColor: "var(--input-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    backgroundColor: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    backgroundColor: "var(--accent)",
                    border: "none",
                    borderRadius: "8px",
                    color: "var(--bg-primary)",
                    cursor: "pointer"
                  }}
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;