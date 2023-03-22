import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../contexts/user.context";
import { ReactComponent as CrownLogo } from "./../assets/crown.svg";

import { signOutUser } from "../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () =>  {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="nav">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <Link className="nav-link" to="/" onClick={signOutHandler}>
            Sign Out
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              Login / Register
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
