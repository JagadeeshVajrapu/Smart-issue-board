import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase";

/* 🔹 STEP 9: Create Issue */
export const createIssue = async ({
  title,
  description,
  priority,
  assignedTo,
}) => {
  try {
    await addDoc(collection(db, "issues"), {
      title,
      description,
      priority,
      status: "Open",
      assignedTo,
      createdBy: auth.currentUser?.email,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating issue:", error);
    throw new Error("Failed to create issue. Please try again.");
  }
};

/* 🔹 STEP 10: Fetch Issues (Newest First) */
export const fetchIssues = async () => {
  try {
    const q = query(
      collection(db, "issues"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("Error fetching issues:", error);
    // Return empty array on error instead of throwing
    return [];
  }
};

/* 🔹 STEP 12: Update Issue Status */
export const updateIssueStatus = async (issueId, newStatus) => {
  try {
    await updateDoc(doc(db, "issues", issueId), {
      status: newStatus,
    });
  } catch (error) {
    console.error("Error updating issue status:", error);
    throw new Error("Failed to update issue status. Please try again.");
  }
};

/* Update Issue (all fields) */
export const updateIssue = async (issueId, updateData) => {
  try {
    await updateDoc(doc(db, "issues", issueId), updateData);
  } catch (error) {
    console.error("Error updating issue:", error);
    throw new Error("Failed to update issue. Please try again.");
  }
};

/* Delete Issue */
export const deleteIssue = async (issueId) => {
  try {
    await deleteDoc(doc(db, "issues", issueId));
  } catch (error) {
    console.error("Error deleting issue:", error);
    throw new Error("Failed to delete issue. Please try again.");
  }
};