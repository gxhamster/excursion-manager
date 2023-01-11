import {
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";

export function ViewTypes() {
  const [excursionTypes, setExcursionTypes] = useState<any>([]);

  const fetchExcursionTypes = async () => {
    const records = await pb.collection("types").getFullList(200);
    console.log(records);
    setExcursionTypes((prevState: any) => [...prevState, ...records]);
  };

  useEffect(() => {
    const records = fetchExcursionTypes();
  }, []);

  return (
    <div>
      <TableContainer margin={5}>
        <Table size="sm">
          <Thead>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Id</Th>
            <Th>Last Issued</Th>
          </Thead>
          <Tbody>
            {excursionTypes.map((v: ExcursionType) => (
              <Tr key={v.id}>
                <Td>{v.name}</Td>
                <Td>{v.description}</Td>
                <Td>{v.id}</Td>
                <Td>{v.lastIssued}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

interface ExcursionType {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  id: string;
  lastIssued: string;
  name: string;
  updated: string;
  expand: {};
}
