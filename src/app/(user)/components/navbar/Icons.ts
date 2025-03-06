import { SiBookstack } from "react-icons/si";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  FaPhotoVideo,
  FaPlayCircle,
  FaUserFriends,
} from "react-icons/fa";
import { MdGroup } from "react-icons/md";


const links = [
  {
    Icon: IoMdNotificationsOutline,
    path: "notifications",
  },
  {
    Icon: SiBookstack,
    path: "activity",
  },
  {
    Icon: FaPhotoVideo,
    path: "photos",
  },
  {
    Icon: FaPlayCircle,
    path: "videos",
  },
  {
    Icon: FaUserFriends,
    path: "friends",
  },

  {
    Icon: MdGroup,
    path: "groups",
  },
];
export default links