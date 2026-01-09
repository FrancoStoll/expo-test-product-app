import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

export const ThemedTextInput = ({ icon, ...props }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<TextInput>(null);
  return (
    <View
      style={{
        ...styles.border,
        borderColor: isActive ? primaryColor : "#ccc",
      }}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={textColor}
          style={{ marginRight: 10 }}
        />
      )}
      <TextInput
        {...props}
        placeholderTextColor="#5c5c5c"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        ref={inputRef}
        style={{ color: textColor, marginRight: 10, flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
