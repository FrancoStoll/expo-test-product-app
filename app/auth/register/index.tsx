import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import { ThemedTextInput } from "@/presentation/theme/components/themed-text-input";
import { ThemedButton } from "@/presentation/theme/components/ThemedButton";
import { ThemedLink } from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const [isPosting, setIsPosting] = useState(false);
  const { createAccount } = useAuthStore();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const onCreateAccount = async () => {
    const { email, fullName, password } = form;

    if (!email || !fullName || !password) {
      Alert.alert(
        "Atención",
        "Debes completar todos los campos para poder crear una cuenta"
      );

      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Password incorrecta",
        "La password debe tener almenos 6 caracteres"
      );
      return;
    }

    setIsPosting(true);

    const wasSuccesful = await createAccount({ email, fullName, password });

    if (wasSuccesful) return router.replace("/");

    setIsPosting(false);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: "#6b6b6b" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>

          {/* email and password */}

          <View style={{ marginTop: 20 }}></View>
          <ThemedTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            onChangeText={(value) => setForm({ ...form, fullName: value })}
            value={form.fullName}
          />
          <ThemedTextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            onChangeText={(value) => setForm({ ...form, email: value })}
            value={form.email}
          />

          <ThemedTextInput
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            onChangeText={(value) => setForm({ ...form, password: value })}
            value={form.password}
          />
        </View>

        {/* botn */}

        <ThemedButton
          icon="arrow-forward-outline"
          onPress={onCreateAccount}
          disabled={isPosting}
        >
          Crear cuenta
        </ThemedButton>

        <View style={{ marginTop: 40 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>¿Ya tienes cuenta?</ThemedText>
          <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default RegisterScreen;
