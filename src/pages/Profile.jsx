import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  updateEmail,
  updatePassword,
  onAuthStateChanged
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          if (data.photoURL) setPhotoURL(data.photoURL);

          const created = data.createdAt?.toDate?.();
          if (created) {
            const interval = setInterval(() => {
              const now = new Date();
              const diff = now - created;
              const seconds = Math.floor(diff / 1000) % 60;
              const minutes = Math.floor(diff / (1000 * 60)) % 60;
              const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              setTimeSpent(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }, 1000);
            return () => clearInterval(interval);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    try {
      if (newEmail) {
        await updateEmail(user, newEmail);
        setEmail(newEmail);
      }

      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      let finalPhotoURL = photoURL;

      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, imageFile);
        finalPhotoURL = await getDownloadURL(storageRef);
        setPhotoURL(finalPhotoURL);
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          photoURL: finalPhotoURL,
          lastUpdated: serverTimestamp()
        },
        { merge: true }
      );

      alert("Profile updated!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <div className="mb-4 flex items-center space-x-4">
        <img
          src={photoURL || "/default-avatar.png"}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover"
        />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Time Spent on Site: {timeSpent || "Loading..."}
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Change Email
          </label>
          <input
            type="email"
            value={newEmail}
            placeholder={email}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Upload Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="block mt-1 text-sm text-gray-600 dark:text-gray-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
