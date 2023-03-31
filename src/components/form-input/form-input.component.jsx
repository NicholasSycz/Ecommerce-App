import { FormInputLabel, Group, Input } from "./form-input.styles";

const FormInput = ({ label, htmlOptions }) => {
  return (
    <Group>
      <Input {...htmlOptions} />
      {label && (
        <FormInputLabel
          shrink={htmlOptions.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
