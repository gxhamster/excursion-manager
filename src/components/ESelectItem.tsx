import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  IExcursionType,
  useGetExcursionTypes,
} from "../hooks/useGetExcursionTypes";

type IESelectItemProp = {
  handleSelect: (currentExcursion: IExcursionType) => void;
};

export function ESelectItem({ handleSelect }: IESelectItemProp) {
  const excursionTypes = useGetExcursionTypes();
  const defaultExcursionType = excursionTypes && excursionTypes[0];

  function selectItemChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    const excursionObj = excursionTypes?.filter(
      (excursion) => excursion.name === e.target.value
    )[0];

    if (excursionObj !== undefined) {
      handleSelect(excursionObj);
    }
  }

  useEffect(() => {
    if (defaultExcursionType !== undefined) {
      handleSelect(defaultExcursionType as IExcursionType);
    }
  }, [excursionTypes]);

  return (
    <FormControl>
      <FormLabel>Excursion</FormLabel>
      <Select onChange={selectItemChanged} required size="md">
        {excursionTypes?.map((excursion) => (
          <option key={excursion.id}>{excursion.name}</option>
        ))}
      </Select>
    </FormControl>
  );
}
