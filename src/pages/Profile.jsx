import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [lastActive, setLastActive] = useState(null);
  const [timeSpent, setTimeSpent] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setEmail(data.email || user.email);
          setCreatedAt(data.createdAt?.toDate());
          setLastActive(new Date());

          // Update lastActive every time they open profile
          await updateDoc(doc(db, "users", user.uid), {
            lastActive: new Date(),
          });

          if (data.createdAt) {
            const diff = new Date() - data.createdAt.toDate();
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            setTimeSpent(`${days}d ${hours}h ${minutes}m`);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">👤 Your Profile</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Account Created:</strong> {createdAt?.toLocaleString() || "N/A"}</p>
        <p><strong>Time Spent on Website:</strong> {timeSpent}</p>
      </div>
    </div>
  );
};

export default Profile;
