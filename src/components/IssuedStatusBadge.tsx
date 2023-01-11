import { Badge } from "@chakra-ui/react";

type IssuedStatusBadgeProps = {
  issued: boolean;
};

function IssuedStatusBadge({ issued }: IssuedStatusBadgeProps) {
  return (
    <>
      {issued ? (
        <Badge colorScheme="green" variant="solid">
          Issued
        </Badge>
      ) : (
        <Badge colorScheme="red" variant="solid">
          Pending
        </Badge>
      )}
    </>
  );
}

export default IssuedStatusBadge;
