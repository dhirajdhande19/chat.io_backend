// auxiliary (helper) function
const getUniqueId = (receiverId, senderId) => {
  return [receiverId, senderId].sort().join('_');
};

export default getUniqueId;
