import React from "react";
import { Text } from "@mantine/core";
import { BrandYoutube } from "tabler-icons-react";

const Logo = ({ size = 48, color = "#FF0000" }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <BrandYoutube size={size} strokeWidth={1.5} color={color} />
      <Text size="xl" weight={500}>
        Trends
      </Text>
    </div>
  );
};

export default Logo;
