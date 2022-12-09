import { ChangeEvent } from "react";
import "./form-input.styles.scss";

type Props = {
  label: string;
  type: string;
  value: string;
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({ handleChange, label, name, type, value }: Props) => {
  const classNameLabel = value.length > 0 ? "shrink" : "";
  return (
    <div className="group">
      <input
        className="form-input"
        type={type}
        required
        value={value}
        name={name}
        onChange={handleChange}
      />
      {label && (
        <label className={`${classNameLabel} form-input-label`}>{label}</label>
      )}
    </div>
  );
};

export default FormInput;
