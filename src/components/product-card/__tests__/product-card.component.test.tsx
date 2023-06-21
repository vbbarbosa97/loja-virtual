import { fireEvent, screen } from "@testing-library/react";
import { Product } from "../../../model/product.model";
import { renderWithProviders } from "../../../utils/test.utils";
import ProductCard from "../product-card.component";

describe("Product Card Component", () => {
  it("should add the product item when Product Card button is clicked", () => {
    const mockProduct: Product = {
      id: 1,
      imageUrl: "test",
      name: "Item A",
      price: 10,
    };

    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: { cartItems: [], isCartOpen: false },
        },
      }
    );

    expect(store.getState().cart.cartItems.length).toBe(0);

    const addToCartButtonElement = screen.getByText(/add to cart/i);

    fireEvent.click(addToCartButtonElement);

    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
