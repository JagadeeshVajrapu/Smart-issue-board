import React, { useState } from 'react'

function CreateIssueForm({ onCreateIssue, existingIssues = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
    assignedTo: '',
  })
  const [showSimilarWarning, setShowSimilarWarning] = useState(false)
  const [error, setError] = useState('')

  // Check for similar issues when title changes
  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData({ ...formData, title })

    // Show warning if title is not empty and similar issue might exist
    // This is UI-only logic - actual similarity check will be done by backend
    if (title.trim().length > 0) {
      const similarExists = existingIssues.some(issue => 
        issue.title.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(issue.title.toLowerCase())
      )
      setShowSimilarWarning(similarExists)
    } else {
      setShowSimilarWarning(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }

    if (!formData.description.trim()) {
      setError('Description is required')
      return
    }

    try {
      // Create the issue (async operation)
      await onCreateIssue(formData)

      // Reset form only on success
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        assignedTo: '',
      })
      setShowSimilarWarning(false)
      setError('')
    } catch (error) {
      // Error is handled by Dashboard, but keep form data in case user wants to retry
      setError(error.message || 'Failed to create issue')
    }
  }

  // Handle create anyway
  const handleCreateAnyway = async (e) => {
    e.preventDefault()
    setShowSimilarWarning(false)
    // Create the issue directly
    if (formData.title.trim() && formData.description.trim()) {
      try {
        await onCreateIssue(formData)
        // Reset form only on success
        setFormData({
          title: '',
          description: '',
          priority: 'Medium',
          status: 'Open',
          assignedTo: '',
        })
        setError('')
      } catch (error) {
        setError(error.message || 'Failed to create issue')
      }
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setShowSimilarWarning(false)
    setFormData({ ...formData, title: '' })
  }

  return (
    <div className="create-issue-form-container">
      {/* Similar Issue Warning */}
      {showSimilarWarning && (
        <div className="similar-issue-warning">
          <p>⚠️ A similar issue might already exist. Please review before creating.</p>
          <div className="warning-buttons">
            <button onClick={handleCreateAnyway} className="btn-warning-create">
              Create Anyway
            </button>
            <button onClick={handleCancel} className="btn-warning-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-issue-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Enter issue title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter issue description"
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To</label>
          <input
            type="text"
            id="assignedTo"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            placeholder="Enter email or name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="createdTime">Created Time</label>
          <input
            type="text"
            id="createdTime"
            value="Auto-generated"
            disabled
            className="disabled-input"
          />
          <small className="form-hint">This will be handled by the backend</small>
        </div>

        <div className="form-group">
          <label htmlFor="createdBy">Created By</label>
          <input
            type="text"
            id="createdBy"
            value="Current user"
            disabled
            className="disabled-input"
          />
          <small className="form-hint">Automatically set to logged-in user</small>
        </div>

        <button type="submit" className="btn-primary">
          Create Issue
        </button>
      </form>
    </div>
  )
}

export default CreateIssueForm

