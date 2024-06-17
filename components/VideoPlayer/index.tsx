import React, { useState, useRef, useEffect, useCallback } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Animated, Easing, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from '@expo/vector-icons';

import { getMusicNoteAnimated, DEVICE_HEIGHT } from "@/utils";
import { Images } from "@/assets/images";
import {
    Container,
    StyledVideo,
    BottomSection,
    BottomLeftSection,
    BottomRightSection,
    FollowButton,
    FollowIcon,
    ChannelName,
    VerticalBar,
    VerticalBarIcon,
    VerticalBarText,
    VerticalBarItem,
    Avatar,
    Caption,
    MusicNameContainer,
    MusicDisc,
    MusicName,
    MusicNameIcon,
    FloatingMusicNote,
    PlayPauseButton,
} from "./styles";
import { ItemTypes } from "@/types";

const VideoPlayer: React.FC<ItemTypes> = ({ item, isActive }) => {
    const bottomTabHeight = useBottomTabBarHeight();
    const video = useRef<Video>(null);
    const { uri, caption, channelName, musicName, likes, comments, avatar } = item;
    const [isPlaying, setIsPlaying] = useState(false);

    const discAnimatedValue = useRef(new Animated.Value(0)).current;
    const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
    const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

    const discAnimation = {
        transform: [
            {
                rotate: discAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                }),
            },
        ],
    };
    const musicNoteAnimation1 = getMusicNoteAnimated(musicNoteAnimatedValue1, false);
    const musicNoteAnimation2 = getMusicNoteAnimated(musicNoteAnimatedValue2, true);

    const discAnimLoopRef = useRef<any>();
    const musicAnimLoopRef = useRef<any>();

    const triggerAnimation = useCallback(() => {
        discAnimLoopRef.current = Animated.loop(
            Animated.timing(discAnimatedValue, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        );
        discAnimLoopRef.current.start();
        musicAnimLoopRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(musicNoteAnimatedValue1, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(musicNoteAnimatedValue2, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ])
        );
        musicAnimLoopRef.current.start();
    }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

    const handlePlayPause = useCallback(async () => {
        if (isPlaying) {
            await video.current.pauseAsync();
            setIsPlaying(false);
        } else {
            await video.current.playAsync();
            setIsPlaying(true);
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isActive) {
            triggerAnimation();
            video.current.playAsync().then(() => {
                setIsPlaying(true);
            });
        } else {
            discAnimLoopRef.current?.stop();
            musicAnimLoopRef.current?.stop();
            discAnimatedValue.setValue(0);
            musicNoteAnimatedValue1.setValue(0);
            musicNoteAnimatedValue2.setValue(0);
            video?.current.stopAsync().then(() => {
                setIsPlaying(false);
            });
        }
    }, [
        isActive,
        triggerAnimation,
        discAnimatedValue,
        musicNoteAnimatedValue1,
        musicNoteAnimatedValue2,
    ]);

    return (
        <Container height={DEVICE_HEIGHT}>
            <StyledVideo
                ref={video}
                source={ uri }
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay={false}
                useNativeControls={false}
                style={StyleSheet.absoluteFill}
            />
            <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
                <PlayPauseButton>
                    <AntDesign name={isPlaying ? 'pausecircleo' : 'playcircleo'} size={32} color="white" />
                </PlayPauseButton>
            </TouchableOpacity>
            <BottomSection>
                <BottomLeftSection>
                    <ChannelName>{channelName}</ChannelName>
                    <Caption>{caption}</Caption>
                    <MusicNameContainer>
                        <MusicNameIcon source={Images.MusicNote} />
                        <MusicName>{musicName}</MusicName>
                    </MusicNameContainer>
                </BottomLeftSection>
                <BottomRightSection>
                    <FloatingMusicNote source={Images.FloatingMusic} style={musicNoteAnimation1} />
                    <FloatingMusicNote source={Images.FloatingMusic} style={musicNoteAnimation2} />
                    <MusicDisc source={Images.Disc} style={discAnimation} />
                </BottomRightSection>
            </BottomSection>
            <VerticalBar>
                <VerticalBarItem>
                    <Avatar source={avatar} />
                    <FollowButton>
                        <FollowIcon source={Images.PlusButton} />
                    </FollowButton>
                </VerticalBarItem>
                <VerticalBarItem>
                    <VerticalBarIcon source={Images.Heart} />
                    <VerticalBarText>{likes}</VerticalBarText>
                </VerticalBarItem>
                <VerticalBarItem>
                    <VerticalBarIcon source={Images.MessageCircle} />
                    <VerticalBarText>{comments}</VerticalBarText>
                </VerticalBarItem>
                <VerticalBarItem>
                    <VerticalBarIcon source={Images.Reply} />
                    <VerticalBarText>Share</VerticalBarText>
                </VerticalBarItem>
            </VerticalBar>
        </Container>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    playPauseButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});
