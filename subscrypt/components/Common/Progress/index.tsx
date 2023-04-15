import { globalStore } from "@/store/global";
import { Box, CircularProgress, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { useRecoilValue } from "recoil";

const Progress: FC = () => {
  const isProgress = useRecoilValue(globalStore.isProgress);
  return isProgress ? (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
      backgroundColor={"rgb(0,0,0,0.8)"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box textAlign={"center"}>
        <CircularProgress size={"80px"} isIndeterminate color="#2e6bd6" />
        <Text color={"#fff"} pt="8px">
          Please wait...
        </Text>
      </Box>
    </Box>
  ) : null;
};

export default memo(Progress);
