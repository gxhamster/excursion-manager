import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { Flex, VStack, Button, Container } from "@chakra-ui/react";
import { ENumberInput } from "./components/ENumberInput";
import { EDropZone } from "./components/EDropZone";
import { ESelectItem } from "./components/ESelectItem";
import { IExcursionType } from "./hooks/useGetExcursionTypes";
import { modifyPdf } from "./lib/pdfMethods";
import { pb } from "./lib/pocketbase";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
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
      setFromFormNumber(latestExcursion[0].toFormNumber);
    }
  }

  function handleSubmit() {
    if (pdfFile) {
      modifyPdf(pdfFile, fromFormNumber, toFormNumber);
      navigate("/pending");
    }
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

export default App;
