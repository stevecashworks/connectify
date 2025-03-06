export type singleChatType={image:string, id:string, username:string}
export type chatGroupType=singleChatType[]
export type chatDataType= {
    friends:chatGroupType,
    groups:chatGroupType
}
const chatData: chatDataType = {
  friends: [
    { id: "friend1", image: "/jack.jpg", username: "jack" },
    { id: "friend2", image: "/jane.jpg", username: "jane" },
    { id: "friend3", image: "/john.jpg", username: "john" },
    { id: "friend4", image: "/james.jpg", username: "james" },
  ],
  groups: [
    { id: "group1", image: "/friendly folks.jpg", username: "Friendly folks" },
    { id: "group2", image: "/tech buddies.jpg", username: "tech buddies" },
    { id: "group3", image: "/travel enthuisiasts.jpg", username: "Travel enthusiasts" },
    {id: "group4", image: "/art admirers.jpg", username: "Art admirers" },
  ],
};
export default chatData