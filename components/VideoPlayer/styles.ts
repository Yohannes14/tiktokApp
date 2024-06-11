import styled from "styled-components/native";
import { WIDTH } from "@/utils";
import { Video } from "expo-av";
import { Animated } from "react-native";

export const Container = styled.View<{ height: number }>`
  width: ${WIDTH}px;
  height: ${props => props.height}px;
`;

export const StyledVideo = styled(Video)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const BottomSection = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
  width: 100%;
  padding-horizontal: 8px;
  padding-bottom: 16px;
`;

export const BottomLeftSection = styled.View`
  flex: 4;
`;

export const BottomRightSection = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ChannelName = styled.Text`
  color: white;
  font-weight: bold;
`;

export const Caption = styled.Text`
  color: white;
  margin-vertical: 8px;
`;

export const MusicNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MusicNameIcon = styled.Image`
  width: 12px;
  height: 12px;
  margin-right: 8px;
`;

export const MusicName = styled.Text`
  color: white;
`;

export const VerticalBar = styled.View`
  position: absolute;
  right: 8px;
  bottom: 72px;
`;

export const VerticalBarItem = styled.View`
  margin-bottom: 24px;
  align-items: center;
`;

export const VerticalBarIcon = styled.Image`
  width: 32px;
  height: 32px;
`;

export const VerticalBarText = styled.Text`
  color: white;
  margin-top: 4px;
`;

export const Avatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-bottom: 48px;
`;

export const FollowButton = styled.View`
  position: absolute;
  bottom: -8px;
`;

export const FollowIcon = styled.Image`
  width: 21px;
  height: 21px;
`;

export const FloatingMusicNote = styled(Animated.Image)`
  position: absolute;
  right: 40px;
  bottom: 16px;
  width: 16px;
  height: 16px;
  tint-color: white;
`;

export const MusicDisc = styled(Animated.Image)`
  width: 40px;
  height: 40px;
`;