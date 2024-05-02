import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebase";

function UserDetails() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserDetails();
  }, []);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`/api/admin/user-details/${id}`);
      const data = await res.json();
      if (data.success === false) return;
      setCurrentUser(data);
      setFetched(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/update-user-details/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) return;
      console.log("returned data ", data);
      setLoading(false);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`/api/admin/delete-user/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) return;
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto ">
      {currentUser && (
        <>
          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt="profile-pic"
              className="h-24 w-24 self-center rounded-full object-cover mt-2 cursor-pointer"
              onClick={() => fileRef.current.click()}
            />
            <p className="text-sm self-center">
              {imageError ? (
                <span className="text-red-700">
                  Error uploading image (image should be less than 2mb.)
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-700">
                  Image uploaded successfully
                </span>
              ) : (
                ""
              )}
            </p>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="bg-slate-100 rounded-lg p-3"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="bg-slate-100 rounded-lg p-3"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <input
              type="text"
              id="password"
              placeholder="Password"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <button
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              type="submit"
            >
              {loading ? "Loading..." : "update"}
            </button>
          </form>
          <div className="flex justify-between mt-4">
            <span
              className="text-red-700 cursor-pointer"
              onClick={handleDeleteAccount}
            >
              Delete account
            </span>
          </div>
          <p className="text-green-700 mt-5">
            {updated && "Profile updated !"}
          </p>
        </>
      )}
      {!fetched && (
        <>
          <h1 className="text-3xl font-semibold text-center my-7">
            Loading...
          </h1>
        </>
      )}
    </div>
  );
}

export default UserDetails;
