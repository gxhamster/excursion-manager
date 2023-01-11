import { useState, useEffect } from "react";
import { pb } from "../lib/pocketbase";

export interface IExcursionType {
  id: "string";
  name: "string";
  description: "string";
}

export const useGetExcursionTypes = () => {
  const [excursionTypes, setExcursionTypes] = useState<IExcursionType[]>();

  useEffect(() => {
    const fetchExcursions = async () => {
      let data: any[] = [];
      try {
        data = await pb.collection("types").getFullList();
      } catch (error) {
        console.error("Error: Could not fetch excursion types", error);
      }

      const excursions = data.map(
        (v) =>
          ({
            id: v.id,
            name: v.name,
            description: v.description,
          } as IExcursionType)
      );

      setExcursionTypes(excursions);
    };

    fetchExcursions();
  }, []);
  return excursionTypes;
};
