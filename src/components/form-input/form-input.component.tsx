import { ChangeEvent } from "react";
import { FormInputLabel, Input, Group } from "./form-input.styles";

type Props = {
  label: string;
  type: string;
  value: string;
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({ handleChange, label, name, type, value }: Props) => {
  return (
    <Group>
      <Input
        type={type}
        required
        value={value}
        name={name}
        onChange={handleChange}
      />
      {label && <FormInputLabel shrink={value.length}>{label}</FormInputLabel>}
    </Group>
  );
};

export default FormInput;
