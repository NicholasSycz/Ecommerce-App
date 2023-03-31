import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../contexts/user.context";
import { CartContext } from "../contexts/cart.context";

import { ReactComponent as CrownLogo } from "./../assets/crown.svg";

import CartIcon from '../components/cart-icon/cart-icon.component';
import CartDropdown from "../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../utils/firebase/firebase.utils";

import { LogoContainer, NavigationContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () =>  {
    await signOutUser();
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink to="/" onClick={signOutHandler}>
            Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">
              Login / Register
            </NavLink>
          )}
          <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
