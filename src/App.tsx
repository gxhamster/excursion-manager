import { Button, HStack, Text } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GenerateExcursionPage from "./components/GenerateExcursionPage";
import PendingExcursionsPage from "./components/PendingExcursionsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <HStack boxShadow="sm" padding={4} justifyContent="space-between">
          <Text fontSize="xl" fontWeight="medium">
            Excursion Manager
          </Text>
          <HStack>
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/pending">
              <Button variant="ghost">Pending</Button>
            </Link>
            <Button variant="ghost">History</Button>
          </HStack>
        </HStack>
        {/* React router context */}
        <Routes>
          <Route element={<GenerateExcursionPage />} path="/" />
          <Route element={<PendingExcursionsPage />} path="/pending" />
        </Routes>
        <Text fontSize="xs" position="fixed" bottom={0} right={2}>
          @gxhamster
        </Text>
      </BrowserRouter>
    </>
  );
}

export default App;
