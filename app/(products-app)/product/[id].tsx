import { Size } from "@/core/products/interfaces/product.interface";
import { ProductImages } from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import { MenuIconButton } from "@/presentation/theme/components/MenuIconButton";
import { ThemedTextInput } from "@/presentation/theme/components/themed-text-input";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import { ThemedButton } from "@/presentation/theme/components/ThemedButton";
import { ThemedButtonGroup } from "@/presentation/theme/components/ThemedButtonGroup";
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Formik } from "formik";
import { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
const ProductId = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation } = useProduct(id.toString());
  const { selectedImages, clearImages } = useCameraStore();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          icon="camera-outline"
          onPress={() => router.push("/camera")}
        />
      ),
    });
  }, []);
  useEffect(() => {
    return () => {
      clearImages();
    };
  }, []);
  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({ title: productQuery.data.title });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href="/" />;
  }

  const product = productQuery.data!;
  return (
    <Formik
      initialValues={product}
      onSubmit={(productLike) =>
        productMutation.mutate({
          ...productLike,
          images: [...productLike.images, ...selectedImages],
        })
      }
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={productQuery.isLoading}
                onRefresh={async () => {
                  await productQuery.refetch();
                }}
              />
            }
          >
            {/* todo images */}
            <ProductImages images={[...product.images, ...selectedImages]} />

            <ThemedView style={{ marginHorizontal: 20, marginTop: 20 }}>
              <ThemedTextInput
                placeholder="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />

              <ThemedTextInput
                placeholder="Descrición"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange("description")}
              />
            </ThemedView>

            <ThemedView
              style={{
                marginHorizontal: 20,
                marginVertical: 5,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />
              <ThemedTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              />
            </ThemedView>

            <ThemedView
              style={{
                marginHorizontal: 20,
              }}
            >
              <ThemedButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOptions={values.sizes}
                onSelect={(option) => {
                  const selectedOption = option as Size;
                  const arrayOptions = new Set(values.sizes);

                  if (arrayOptions.has(selectedOption)) {
                    arrayOptions.delete(selectedOption);
                  } else {
                    arrayOptions.add(selectedOption);
                  }
                  setFieldValue("sizes", [...arrayOptions]);
                }}
              />
              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelect={(option) => setFieldValue("gender", option)}
              />

              <View
                style={{
                  marginBottom: 50,
                  marginTop: 20,
                }}
              >
                <ThemedButton
                  //   onPress={() => console.log("guardar")}
                  icon="save-outline"
                  onPress={() => handleSubmit()}
                >
                  Guardar
                </ThemedButton>
              </View>
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};
export default ProductId;
