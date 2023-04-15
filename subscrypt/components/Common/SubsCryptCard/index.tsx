import { globalStore } from "@/store/global";
import { Box, Button, Text } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { FC, memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface SubsCryptCardProps {
  selectedSubscriptionName: string;
  selectedSubscriptionPlanCost: number;
  month: string;
  selectedSubscriptionPlanCostInCrypto: number;
  showCancelButton: boolean;
  onCancel?: () => void;
}

const inter = Inter({ subsets: ["latin"] });

const SubsCryptCard: FC<SubsCryptCardProps> = (props) => {
  const {
    selectedSubscriptionName,
    selectedSubscriptionPlanCost,
    month,
    selectedSubscriptionPlanCostInCrypto,
    showCancelButton = false,
    onCancel,
  } = props;
  const setIsCardInfoModalOpen = useSetRecoilState(
    globalStore.isCardInfoModalOpen
  );
  const isEth = useRecoilValue(globalStore.isEth);
  return (
    <Box
      width="100%"
      padding="16px 24px"
      borderRadius="8px"
      border="1px solid #D2D5FB"
    >
      <Box>
        <Text className={inter.className} fontSize="16px" fontWeight="bold">
          {selectedSubscriptionName}
        </Text>
      </Box>
      <Box display="flex" flexDirection={"column"}>
        <Box>
          <Text className={inter.className} fontSize="16px">
            {selectedSubscriptionPlanCost}
            <Text as="span" fontSize="10px" pl="2px" pr="4px">
              USD
            </Text>
            × {month}
            <Text as="span" fontSize="12px" pl="4px">
              {month === "1" ? "month" : "months"}
            </Text>
          </Text>
        </Box>
        <Box textAlign="right" width={"100%"}>
          <Text className={inter.className} fontSize="16px">
            <Text as="span" fontSize="12px" pr="8px">
              About
            </Text>
            <Text as="span" fontWeight="bold" fontSize="24px" pr="8px">
              {(selectedSubscriptionPlanCostInCrypto * Number(month)).toFixed(
                3
              )}
            </Text>
            <Text as="span" fontSize="18px">
              {isEth ? "ETH " : "USDC"}
            </Text>
          </Text>
        </Box>
      </Box>
      {isEth && (
        <Box borderTop="1px solid #D2D5FB" textAlign="right" pt="8px">
          <Text className={inter.className} fontSize="12px">
            ( Ξ {selectedSubscriptionPlanCostInCrypto * Number(month)})
          </Text>
        </Box>
      )}
      {showCancelButton && (
        <Box
          mt="16px"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"8px"}
        >
          <Button
            width="100%"
            colorScheme={"red"}
            variant="solid"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default memo(SubsCryptCard);
