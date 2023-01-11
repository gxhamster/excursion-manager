import {
  FormControl,
  FormLabel,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

type ENumberInputProps = {
  label: string;
  onChange?: (e: any) => void;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
};

export const ENumberInput = ({
  label,
  onChange,
  value,
  defaultValue,
  min = 0,
  max,
}: ENumberInputProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <NumberInput
        value={value}
        max={max}
        min={min}
        defaultValue={defaultValue}
        step={1}
        onChange={onChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
