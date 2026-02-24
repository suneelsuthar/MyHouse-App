import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { adjustSize, colors } from "../theme";

interface GalleryProps {
  images: string[];
  hideList: boolean;
}

export function CustomGallery({ images, hideList  }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <View style={styles.container}>
      {/* Top Selected Image */}
      <Image source={{ uri: selectedImage }} style={styles.mainImage} />

      {/* Horizontal Thumbnails */}
      {!hideList && (
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedImage(item)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: item }}
                  style={[
                    styles.thumbnail,
                    { marginLeft: index === 0 ? adjustSize(10) : 0 },
                  ]}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  mainImage: {
    width: "100%",
    height: adjustSize(306),
    resizeMode: "cover",
  },
  thumbnailList: {
    marginVertical: adjustSize(12),
  },
  thumbnail: {
    width: adjustSize(79),
    height: adjustSize(79),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    marginRight: adjustSize(10),
  },
});
