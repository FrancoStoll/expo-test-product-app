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
const LoginSreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    if (!form.email.length || !form.password.length) {
      Alert.alert("Error", "Email y contraseña son requeridos");
      return;
    }
    setIsPosting(true);

    const wasSuccesful = await login(form.email, form.password);

    setIsPosting(false);
    if (wasSuccesful) {
      router.replace("/");
      return;
    }

    Alert.alert("Error", "Usuario o contraseña incorrectos");
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
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "#6b6b6b" }}>
            Por favor ingrese para continuar
          </ThemedText>

          {/* email and password */}

          <View style={{ marginTop: 20 }}></View>
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
          onPress={onLogin}
          disabled={isPosting}
        >
          Ingresar
        </ThemedButton>

        <View style={{ marginTop: 40 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>¿No tienes cuenta?</ThemedText>
          <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
            Crear Cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default LoginSreen;
