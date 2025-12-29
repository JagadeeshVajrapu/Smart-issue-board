import React, { useState } from 'react'

function IssueItem({ issue, onUpdateIssue, onDeleteIssue, currentUser }) {
  // Provide default functions if not passed
  const handleUpdate = onUpdateIssue || (() => {});
  const handleDelete = onDeleteIssue || (() => {});
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: issue.title,
    description: issue.description,
    priority: issue.priority,
    status: issue.status,
    assignedTo: issue.assignedTo,
  })
  const [statusError, setStatusError] = useState('')

  // Handle status change with validation
  const handleStatusChange = (newStatus) => {
    setStatusError('')

    // Validate status transition: Open → Done not allowed
    if (issue.status === 'Open' && newStatus === 'Done') {
      setStatusError('Please move the issue to In Progress before marking it Done.')
      return
    }

    // Update status
    handleUpdate(issue.id, { status: newStatus })
    setEditData({ ...editData, status: newStatus })
  }

  // Handle save edit
  const handleSave = () => {
    setStatusError('')
    
    // Validate status transition if changing status
    if (issue.status === 'Open' && editData.status === 'Done') {
      setStatusError('Please move the issue to In Progress before marking it Done.')
      return
    }

    handleUpdate(issue.id, editData)
    setIsEditing(false)
  }

  // Handle cancel edit
  const handleCancel = () => {
    setEditData({
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
      status: issue.status,
      assignedTo: issue.assignedTo,
    })
    setIsEditing(false)
    setStatusError('')
  }

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    // Handle Firebase Timestamp
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Get priority badge class
  const getPriorityClass = (priority) => {
    return `priority-badge priority-${priority.toLowerCase().replace(' ', '-')}`
  }

  // Get status badge class
  const getStatusClass = (status) => {
    return `status-badge status-${status.toLowerCase().replace(' ', '-')}`
  }

  if (isEditing) {
    return (
      <tr className="issue-row editing">
        <td colSpan="6">
          <div className="edit-form">
            {statusError && <div className="error-message">{statusError}</div>}
            
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Priority:</label>
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status:</label>
                <select
                  value={editData.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="form-group">
                <label>Assigned To:</label>
                <input
                  type="text"
                  value={editData.assignedTo}
                  onChange={(e) => setEditData({ ...editData, assignedTo: e.target.value })}
                />
              </div>
            </div>

            <div className="edit-actions">
              <button onClick={handleSave} className="btn-primary btn-sm">
                Save
              </button>
              <button onClick={handleCancel} className="btn-secondary btn-sm">
                Cancel
              </button>
            </div>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className="issue-row">
      <td>
        <div className="issue-title">
          <strong>{issue.title}</strong>
          {issue.description && (
            <div className="issue-description">{issue.description}</div>
          )}
        </div>
      </td>
      <td>
        <span className={getPriorityClass(issue.priority)}>
          {issue.priority}
        </span>
      </td>
      <td>
        <span className={getStatusClass(issue.status)}>
          {issue.status}
        </span>
      </td>
      <td>{issue.assignedTo || '-'}</td>
      <td>{formatDate(issue.createdAt)}</td>
      <td>
        <div className="issue-actions">
          <button
            onClick={() => setIsEditing(true)}
            className="btn-edit btn-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(issue.id)}
            className="btn-delete btn-sm"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default IssueItem

