// const declarations
const GET_CHANNEL_MESSAGES = 'messages/GET_MESSAGES';


// action creators
const getChannelMessages = (data) => ({
   type: GET_CHANNEL_MESSAGES,
   payload: data
});


// thunk declarations
export const getChannelMessagesThunk = (channelId) => async (dispatch) => {
   const res = await fetch(`/api/channels/${channelId}/messages`)
   if (res.ok) {
      const data = await res.json()
      dispatch(getChannelMessages(data))
      return
   }
};


// reducer
const inistialState = {}
const messagesReducer = (state = inistialState, action) => {
   switch (action.type) {
      case GET_CHANNEL_MESSAGES: {
         const channelId = action.payload.channel_id
         const newState = {
            ...state
         }
         newState[channelId] = {...action.payload.messages}
         return newState;
      }
      default:
         return state
   }
};

export default messagesReducer;
