import { Link, LinkProps } from "expo-router";
import { ThemedText } from "./themed-text";

interface Props extends LinkProps {}

export const ThemedLink = ({ children, ...props }: Props) => {
  return (
    <Link
      {...props}
      style={[
        { justifyContent: "center", alignContent: "center" },
        props.style,
      ]}
    >
      <ThemedText type="link">{children}</ThemedText>
    </Link>
  );
};
