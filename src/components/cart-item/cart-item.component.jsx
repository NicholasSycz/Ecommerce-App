import { CartItemContainer, ItemDetails } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>Qty: {quantity}</span>
        <span>Price: ${price}</span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
