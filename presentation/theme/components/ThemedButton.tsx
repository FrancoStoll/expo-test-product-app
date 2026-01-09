import { Ionicons } from "@expo/vector-icons";
import {
    Pressable,
    PressableProps,
    StyleSheet,
    Text
} from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props extends PressableProps {
  icon?: keyof typeof Ionicons.glyphMap;
  children: string;
}

export const ThemedButton = ({ children, icon, ...props }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      {...props}
      style={({ pressed }) => ({
        ...style.button,
        backgroundColor: primaryColor,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text style={style.text}>{children}</Text>
      {icon && <Ionicons name={icon} size={24} color="#fff" />}
    </Pressable>
  );
};

const style = StyleSheet.create({
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    flexDirection: "row",
    gap: 5,
  },
  text: {
    color: "#fff",
    lineHeight: 24,
  },
});
