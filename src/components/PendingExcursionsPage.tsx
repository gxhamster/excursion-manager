import {
  Container,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import IssuedStatusBadge from "./IssuedStatusBadge";
import IssueExcursionModal from "./IssueExcursionModal";

export interface PendingExcursion {
  id: string;
  created: string;
  expand: PendingExcursionType;
  fromFormNumber: number;
  toFormNumber: number;
  generatedDate: string;
  issued: boolean;
  issuedDate: string;
  receivedBy: string;
  updated: string;
}

export interface PendingExcursionType {
  type: ExcursionType;
}

export interface ExcursionType {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
}

export interface TypeExpand {}

function PendingExcursionsPage() {
  const [pendingExcursions, setPendingExcursions] = useState<
    PendingExcursion[] | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function issuePendingExcursion(excursion: PendingExcursion) {
    const data = {
      issued: true,
    };
    try {
      await pb.collection("pending").update(excursion.id, data);
    } catch (error) {
      console.error("Error: Cannot issue pending excursion", error);
    } finally {
      fetchPending();
    }
  }

  async function fetchPending() {
    const resultList = await pb.collection("pending").getList(1, 50, {
      expand: "type",
    });

    // TODO: this any type
    const data: any[] = resultList.items.map((v) => ({
      id: v.id,
      created: v.created,
      expand: v.expand,
      fromFormNumber: v.fromFormNumber,
      toFormNumber: v.toFormNumber,
      generatedDate: v.generatedDate,
      issued: v.issued,
      issuedDate: v.issuedDate,
      receivedBy: v.receivedBy,
      updated: v.updated,
    }));
    setPendingExcursions([...data]);
  }

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <Container marginTop={10} maxW={1000}>
      <Text fontSize="2xl" marginY={5}>
        Pending Excursions
      </Text>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Type</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Issued</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pendingExcursions?.map((excursion: PendingExcursion) => (
              <Tr key={excursion.id}>
                <Td>{excursion.id}</Td>
                <Td>{excursion.expand.type.name}</Td>
                <Td>{excursion.fromFormNumber}</Td>
                <Td>{excursion.toFormNumber}</Td>
                <Td>
                  <IssuedStatusBadge issued={excursion.issued} />
                </Td>
                <Td>
                  <Button
                    size="sm"
                    disabled={excursion.issued}
                    onClick={onOpen}
                  >
                    Issue
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <IssueExcursionModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}

export default PendingExcursionsPage;
