import { useState } from "react";
import { Flex, VStack, Button, Container, useToast } from "@chakra-ui/react";
import { ENumberInput } from "./ENumberInput";
import { EDropZone } from "./EDropZone";
import { ESelectItem } from "./ESelectItem";
import { IExcursionType } from "../hooks/useGetExcursionTypes";
import { modifyPdf } from "../lib/pdfMethods";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import { PDFDocument } from "pdf-lib";

function GenerateExcursionPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentExcursionType, setCurrentExcursionType] =
    useState<IExcursionType | null>(null);
  const [fromFormNumber, setFromFormNumber] = useState(0);
  const [toFormNumber, setToFormNumber] = useState(0);
  const [pdfFile, setPdfFile] = useState<PDFDocument>();

  async function currentExcursionTypeChanged(excursionType: IExcursionType) {
    const latestExcursion = await pb
      .collection("pending")
      .getFullList(1, { sort: "-created" });

    setCurrentExcursionType(excursionType);

    if (excursionType.id !== latestExcursion[0].type) {
      setFromFormNumber(1);
    } else {
      setFromFormNumber(latestExcursion[0].toFormNumber + 1);
    }
  }

  function handleSubmit() {
    async function createNewExcursion() {
      if (toFormNumber <= fromFormNumber) {
        console.error(
          "Error: Ending form number is smaller or equal to starting form number"
        );
        toast({
          title: `Error`,
          position: "bottom",
          description: "To form number cannot be larger than to form number",
          status: "error",
          isClosable: true,
        });
      } else {
        const newExcursion = {
          type: currentExcursionType?.id,
          fromFormNumber: fromFormNumber,
          toFormNumber: toFormNumber,
          issued: false,
          generatedDate: new Date().toString(),
          issuedDate: "",
          receivedBy: "",
        };

        try {
          const record = await pb.collection("pending").create(newExcursion);
          console.log("New Record: ", record);
        } catch (error) {
          console.error("Error: Cannot create new excursion", error);
        }

        if (pdfFile) {
          modifyPdf(pdfFile, fromFormNumber, toFormNumber);
          navigate("/pending");
        }
      }
    }
    createNewExcursion();
  }

  return (
    <VStack margin={10} spacing={10}>
      <Flex
        minWidth={600}
        flexDirection="column"
        justifyContent="center"
        gap={5}
      >
        <Container centerContent mb="5">
          <EDropZone onPdfRead={(file) => setPdfFile(file)}></EDropZone>
        </Container>
        <ESelectItem handleSelect={currentExcursionTypeChanged} />
        <Flex justifyContent="space-between" gap={6}>
          <ENumberInput value={fromFormNumber} label="From" />
          <ENumberInput
            onChange={setToFormNumber}
            defaultValue={fromFormNumber + 20}
            label="To"
            min={fromFormNumber + 1}
          />
        </Flex>
        <Button padding={5} colorScheme="twitter" onClick={handleSubmit}>
          Generate
        </Button>
      </Flex>
    </VStack>
  );
}

export default GenerateExcursionPage;
