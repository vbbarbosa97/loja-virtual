import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  SpinnerContainer,
} from "./button.styles";

type Props = {
  children: ReactNode;
  typeClass?: "google-sign-in" | "inverted" | "base";
  isLoading?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, typeClass, isLoading = false, ...rest }: Props) => {
  const CustomButton = getButton(typeClass);

  return (
    <CustomButton disabled={isLoading} {...rest}>
      {children}
      {isLoading && <SpinnerContainer data-testid="loading-button" />}
    </CustomButton>
  );
};

export default Button;
