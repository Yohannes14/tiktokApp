import styled from "styled-components/native";
import { Dimensions, Platform } from "react-native";
import { Video } from "expo-av";
import { Animated } from "react-native";

import { DEVICE_HEIGHT,  DEVICE_WIDTH }  from "@/utils";

export const Container = styled.View<{ height: number }>`
  width: ${DEVICE_WIDTH}px;
  height: ${props => props.height}px;
`;

export const StyledVideo = styled(Video)`
  width: 100%;
  height: 100%;
`;

export const PlayPauseButton = styled.View`
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const BottomSection = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
  width: 100%;
  padding: 0 8px 16px;
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
  font-size: ${DEVICE_WIDTH * 0.04}px;
`;

export const Caption = styled.Text`
  color: white;
  margin-vertical: 8px;
  font-size: ${DEVICE_WIDTH * 0.035}px;
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
  font-size: ${DEVICE_WIDTH * 0.035}px;
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
  font-size: ${DEVICE_WIDTH * 0.035}px;
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
