import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props {
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
}

export const ThemedButtonGroup = ({
  options,
  selectedOptions,
  onSelect,
}: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selectedOptions.includes(option) && {
              backgroundColor: primaryColor,
            },
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              styles.buttonText,
              selectedOptions.includes(option) && styles.selectedButtonText,
            ]}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 5,
    // width: '100%'
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,

  },
  selectedButtonText: {
    color: "#fff",
  },
});
