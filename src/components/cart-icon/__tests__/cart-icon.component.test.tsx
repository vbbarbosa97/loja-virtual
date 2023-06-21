import { ProductCart } from "../../../model/product.model";
import { renderWithProviders } from "../../../utils/test.utils";
import CartIcon from "../cart-icon.component";
import { screen } from "@testing-library/react";

describe("Cart-Icon Component", () => {
  it("should preloaded state to render", () => {
    const initialCartitem: ProductCart[] = [
      { id: 1, name: "Item A", imageUrl: "test", price: 10, quantity: 1 },
    ];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          cartItems: initialCartitem,
          isCartOpen: false,
        },
      },
    });

    const cartIconElement = screen.getByText("1");

    expect(cartIconElement).toBeInTheDocument();
  });
});
