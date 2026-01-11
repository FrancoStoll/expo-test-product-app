import { Product } from "@/core/products/interfaces/product.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

export const ProductList = ({ products, loadNextPage }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      showsVerticalScrollIndicator={false}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
