import { render, screen } from "@testing-library/react";
import Button from "../button.component";

describe("Button Component", () => {
  it("should render base button when nothin is passed", () => {
    render(<Button>Test</Button>);

    const buttonElement = screen.getByText(/test/i);

    expect(buttonElement).toHaveStyle("background-color: black;");
  });

  it("should render google button when passed google button type", () => {
    render(<Button typeClass="google-sign-in">Test</Button>);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveStyle("background-color: #4285f4;");
  });

  it("should render inverted button when passed inverted button type", () => {
    render(<Button typeClass="inverted">Test</Button>);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveStyle("background-color: white;");
  });

  it("should be disabled if isLoading is true", () => {
    render(<Button isLoading>Test</Button>);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeDisabled();
  });

  it("should render spinner if isLoading is true", () => {
    render(<Button isLoading>Test</Button>);

    const spinnerElement = screen.getByTestId("loading-button");

    expect(spinnerElement).toBeInTheDocument();
  });
});
