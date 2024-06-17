import { FlatList } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { DATA } from "@/constants/data";
import VideoPlayer from "@/components/VideoPlayer";
import { DEVICE_HEIGHT } from "@/utils";

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const bottomTabHeight = useBottomTabBarHeight();
  

  return (
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <VideoPlayer item={item} isActive={activeVideoIndex === index} />
        )}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y / DEVICE_HEIGHT - bottomTabHeight
          );
          setActiveVideoIndex(index);
        }}
      />
  );
};

export default HomeScreen;

