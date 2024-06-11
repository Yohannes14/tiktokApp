import { FlatList, SafeAreaView } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { DATA } from "@/constants/data";
import VideoPlayer from "@/components/VideoPlayer";
import { HEIGHT } from "@/utils";

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const bottomTabHeight = useBottomTabBarHeight();
  

  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        pagingEnabled
        renderItem={({ item, index }) => (
          <VideoPlayer item={item} isActive={activeVideoIndex === index} />
        )}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y / HEIGHT - bottomTabHeight
          );
          setActiveVideoIndex(index);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

