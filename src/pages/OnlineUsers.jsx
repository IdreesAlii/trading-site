import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const OnlineUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      const now = new Date();

      const data = snapshot.docs.map((doc) => {
        const user = doc.data();
        const lastActive = user.lastActive?.toDate?.() || null;

        // Determine if user is online (lastActive within 5 minutes)
        const isOnline = lastActive
          ? now - lastActive < 5 * 60 * 1000 // 5 minutes in ms
          : false;

        return {
          email: user.email || "Unknown",
          lastActive: lastActive?.toLocaleString() || "Never",
          isOnline,
        };
      });

      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
      <ul className="space-y-2">
        {users.map((user, idx) => (
          <li
            key={idx}
            className="p-4 rounded border flex justify-between items-center bg-white dark:bg-gray-800"
          >
            <div>
              <p className="font-semibold">{user.email}</p>
              <p className="text-sm">Last Active: {user.lastActive}</p>
            </div>
            <span
              className={`text-sm font-bold ${
                user.isOnline ? "text-green-500" : "text-red-500"
              }`}
            >
              {user.isOnline ? "Online" : "Offline"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OnlineUsers;