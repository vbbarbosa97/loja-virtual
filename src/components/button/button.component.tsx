import { ComponentPropsWithoutRef, ReactNode } from "react";
import "./button.styles.scss";

type Props = {
  children: ReactNode;
  typeClass?: "google-sign-in" | "inverted";
} & ComponentPropsWithoutRef<"button">;

const Button = ({ children, typeClass }: Props) => {
  return (
    <button className={`button-container ${typeClass}`}>{children}</button>
  );
};

export default Button;
