import React, { useCallback, useEffect, useRef } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
    Animated,
    Easing,
} from "react-native";
import { ResizeMode } from "expo-av";

import { getMusicNoteAnimated, HEIGHT } from "@/utils";
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
    FloatingMusicNote
} from "./styles";
import { ItemTypes } from "@/types";


const VideoPlayer:React.FC<ItemTypes> = ({ item, isActive }) => {
    const bottomTabHeight = useBottomTabBarHeight();
    const video = useRef(null);
    const { uri, caption, channelName, musicName, likes, comments, avatar } =
        item;

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

    useEffect(() => {
        if (isActive) {
            triggerAnimation();
        } else {
            discAnimLoopRef.current?.stop();
            musicAnimLoopRef.current?.stop();
            discAnimatedValue.setValue(0);
            musicNoteAnimatedValue1.setValue(0);
            musicNoteAnimatedValue2.setValue(0);
        }
    }, [
        isActive,
        triggerAnimation,
        discAnimatedValue,
        musicNoteAnimatedValue1,
        musicNoteAnimatedValue2,
    ]);

    return (
        <Container height={ HEIGHT - bottomTabHeight }>
            <StyledVideo
                ref={video}
                source={uri}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
            />
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

