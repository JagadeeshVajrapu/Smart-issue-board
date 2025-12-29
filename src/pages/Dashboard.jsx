import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateIssueForm from "../components/CreateIssueForm";
import IssueList from "../components/IssueList";
import { fetchIssues, createIssue, updateIssueStatus, updateIssue, deleteIssue } from "../issueService";
import { logout } from "../authService";
import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const navigate = useNavigate();

  /* 🔹 STEP 10: Fetch issues on page load */
  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await fetchIssues();
        setIssues(data);
      } catch (error) {
        console.error("Error loading issues:", error);
        // Issues will be empty array on error, which is handled by UI
      }
    };

    loadIssues();
  }, []);

  /* 🔹 STEP 9 + STEP 11: Create issue with similar issue detection */
  const handleCreateIssue = async (issueData) => {
    try {
      const { title } = issueData;

      // 🔹 STEP 11: Similar Issue Detection
      const similar = issues.find(issue =>
        issue.title.toLowerCase().includes(title.toLowerCase())
      );

      if (similar) {
        alert("⚠️ A similar issue already exists!");
        return;
      }

      // 🔹 STEP 9: Create issue in Firestore
      await createIssue(issueData);

      // Reload issues so newest appears on top
      const updatedIssues = await fetchIssues();
      setIssues(updatedIssues);
    } catch (error) {
      console.error("Error creating issue:", error);
      alert(error.message || "Failed to create issue. Please try again.");
    }
  };

  /* 🔹 Handle logout */
  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      onLogout();
      navigate("/login");
    }
  };

  /* 🔹 Handle issue update */
  const handleUpdateIssue = async (issueId, updateData) => {
    try {
      if (updateData.status) {
        await updateIssueStatus(issueId, updateData.status);
      } else {
        await updateIssue(issueId, updateData);
      }
      // Reload issues
      const updatedIssues = await fetchIssues();
      setIssues(updatedIssues);
    } catch (error) {
      console.error("Error updating issue:", error);
      alert("Failed to update issue. Please try again.");
    }
  };

  /* 🔹 Handle issue delete */
  const handleDeleteIssue = async (issueId) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) {
      return;
    }
    try {
      await deleteIssue(issueId);
      // Reload issues
      const updatedIssues = await fetchIssues();
      setIssues(updatedIssues);
    } catch (error) {
      console.error("Error deleting issue:", error);
      alert("Failed to delete issue. Please try again.");
    }
  };

  /* 🔹 Filter issues */
  const filteredIssues = issues.filter((issue) => {
    const statusMatch =
      statusFilter === "All" || issue.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All" || issue.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Smart Issue Board</h1>
          <div className="header-right">
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Create Issue Section */}
        <section className="create-issue-section">
          <h2>Create New Issue</h2>
          <CreateIssueForm onCreateIssue={handleCreateIssue} existingIssues={issues} />
        </section>

        {/* Issue List Section */}
        <section className="issue-list-section">
          <div className="section-header">
            <h2>Issues</h2>

            {/* Filters */}
            <div className="filters">
              <div className="filter-group">
                <label>Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Priority:</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          <IssueList
            issues={filteredIssues}
            currentUser={user.email}
            onUpdateIssue={handleUpdateIssue}
            onDeleteIssue={handleDeleteIssue}
          />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
