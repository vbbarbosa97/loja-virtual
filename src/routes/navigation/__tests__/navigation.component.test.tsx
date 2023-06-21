import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test.utils";
import Navigation from "../navigation.component";
import { User } from "firebase/auth";
import { signOutStart } from "../../../store/user/user.action";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Navigation Component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("should render a sign in link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: { currentUser: null, error: null, isLoading: false },
      },
    });

    const signInLinkElement = screen.getByText(/sign in/i);
    const signOutLinkElement = screen.queryByText(/sign out/i);

    expect(signInLinkElement).toBeInTheDocument();
    expect(signOutLinkElement).not.toBeInTheDocument();
  });

  it("should render sign out and not sign in if there  is a currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: { currentUser: {} as User, error: null, isLoading: false },
      },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    const signInLinkElement = screen.queryByText(/sign in/i);

    expect(signOutLinkElement).toBeInTheDocument();
    expect(signInLinkElement).toBeNull();
  });

  it("should not render a cart dropdown if iscartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: { isCartOpen: false, cartItems: [] },
      },
    });

    const dropdownTextElement = screen.queryByText(/your cart is empty/i);

    expect(dropdownTextElement).toBeNull();
  });

  it("should render a cart dropdown if iscartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: { isCartOpen: true, cartItems: [] },
      },
    });

    const dropdownTextElement = screen.getByText(/your cart is empty/i);

    expect(dropdownTextElement).toBeInTheDocument();
  });

  it("should dispatch signOutStart action when clicking on the Sign Out link", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: { currentUser: {} as User, error: null, isLoading: false },
      },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);

    expect(signOutLinkElement).toBeInTheDocument();

    fireEvent.click(signOutLinkElement);

    const signOutAction = signOutStart();

    expect(mockDispatch).toHaveBeenCalled(); //verifica se o dispatch foi executado
    expect(mockDispatch).toHaveBeenCalledWith(signOutAction); //verifica se  o dispatch foi chamando passando essa
  });
});
