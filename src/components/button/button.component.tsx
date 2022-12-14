import { ComponentPropsWithoutRef, ReactNode } from "react";
import "./button.styles.scss";

type Props = {
  children: ReactNode;
  typeClass?: "google-sign-in" | "inverted";
} & ComponentPropsWithoutRef<"button">;

const Button = ({ children, typeClass, ...rest }: Props) => {
  return (
    <button className={`button-container ${typeClass}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
