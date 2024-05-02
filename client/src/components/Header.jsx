import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOutSuccess } from "../redux/admin/adminSlice";


function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { isAdminLogged } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(SignOutSuccess());
    navigate('/admin-login');
  };
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to={isAdminLogged ? "/admin" : "/"}>
          <h1 className="font-bold">Simple Auth</h1>
        </Link>
        {!isAdminLogged ? (
          <ul className="flex gap-4">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/about"}>
              <li>About</li>
            </Link>
            <Link to={"/profile"}>
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <li>Sign In</li>
              )}
            </Link>
          </ul>
        ) : (
          <button onClick={handleLogOut}>Sign out</button>
        )}
      </div>
    </div>
  );
}

export default Header;
