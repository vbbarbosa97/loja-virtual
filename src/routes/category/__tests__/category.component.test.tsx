import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test.utils";
import Category from "../category.component";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ category: "mens" }),
}));

describe("Category Component", () => {
  it("should render a Spinner if isLoading is true", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: { isLoading: true, categories: [], error: null },
      },
    });

    const spinnerElement = screen.getByTestId("spinner");

    expect(spinnerElement).toBeInTheDocument();
  });

  it("should render categories if isLoading is false", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: "mens",
              items: [
                { id: 1, imageUrl: "test", name: "Item A", price: 10 },
                { id: 2, imageUrl: "test", name: "Item B", price: 10 },
              ],
            },
          ],
          error: null,
        },
      },
    });

    const spinnerElement = screen.queryByTestId("spinner");

    expect(spinnerElement).toBeNull();

    const buttonProductElement = screen.getAllByText(/add to cart/i);

    expect(buttonProductElement.length).toBe(2);
  });
});
