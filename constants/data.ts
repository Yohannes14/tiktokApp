import { Images } from "@/assets/images";
import { Videos } from "@/assets/video";
import { DataTypes } from "@/types";

export const DATA: DataTypes[] = [
  {
    id: 1,
    channelName: "Jd_new",
    uri: Videos.Video1,
    caption: "new fun video #fun #tiktok #video",
    musicName: "Song #1",
    likes: 43,
    comments: 22,
    avatar: Images.User,
  },
  {
    id: 2,
    channelName: "Yohannes",
    uri: Videos.Video2,
    caption: "Sample Video #ethio #tiktok #fun",
    musicName: "Song #2",
    likes: 41,
    comments: 22,
    avatar: Images.User,
  },
];
