import React, { useState } from 'react'
import IssueItem from './IssueItem'

function IssueList({ issues, onUpdateIssue, onDeleteIssue, currentUser }) {
  // Sort issues: newest first (by createdAt)
  // Firebase returns createdAt as a Timestamp object, so we need to handle it
  const sortedIssues = [...issues].sort((a, b) => {
    const timeA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
    const timeB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
    return timeB - timeA;
  })

  if (sortedIssues.length === 0) {
    return (
      <div className="empty-state">
        <p>No issues found. Create your first issue above!</p>
      </div>
    )
  }

  return (
    <div className="issue-list">
      <table className="issues-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Created Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedIssues.map(issue => (
            <IssueItem
              key={issue.id}
              issue={issue}
              onUpdateIssue={onUpdateIssue}
              onDeleteIssue={onDeleteIssue}
              currentUser={currentUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IssueList

