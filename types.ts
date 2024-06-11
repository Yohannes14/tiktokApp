import { ImageSourcePropType } from "react-native";

export interface DataTypes {
    id: number;
    channelName: string;
    uri: string;
    caption: string;
    musicName: string;
    likes: number;
    comments: number;
    avatar: ImageSourcePropType;
  }

  export interface ItemTypes {
    item:DataTypes,
    isActive:boolean
  }