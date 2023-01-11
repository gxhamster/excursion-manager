import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Text } from "@chakra-ui/react";
import { PDFDocument } from "pdf-lib";

type EDropZoneProps = {
  onPdfRead: (pdfDoc: PDFDocument) => void;
};

export const EDropZone = ({ onPdfRead }: EDropZoneProps) => {
  const [fileName, setFileName] = useState("");

  // Read files and parse into PDF
  const onDrop = useCallback(async (acceptedFiles: any) => {
    console.log(acceptedFiles);
    const file = acceptedFiles && acceptedFiles[0];
    setFileName(file.path);

    const reader = new FileReader();

    reader.onabort = () => console.error("file reading was aborted");
    reader.onerror = () => console.error("file reading has failed");
    reader.onload = async () => {
      const pdfBuffer = await PDFDocument.load(reader.result as ArrayBuffer);
      // Pass PDF buffer to parent
      onPdfRead(pdfBuffer);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <Box
      transition="all"
      borderStyle="dashed"
      borderWidth={2}
      py={20}
      px={5}
      borderColor={fileName ? "green.300" : "twitter.300"}
      w={300}
      h={200}
      borderRadius="3xl"
      textAlign="center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Text fontSize="md" fontWeight={500}>
        {fileName ? fileName : "Drop the PDF here"}
      </Text>
    </Box>
  );
};
