// const declarations
const GET_CHANNEL_MESSAGES = 'messages/GET_MESSAGES';
const ADD_MESSAGE = 'messages/ADD_MESSAGE';


// action creators
const getChannelMessages = (data) => ({
   type: GET_CHANNEL_MESSAGES,
   payload: data
});

const addMessage = (data) => ({
   type: ADD_MESSAGE,
   payload: data
})


// thunk declarations
export const getChannelMessagesThunk = (channelId) => async (dispatch) => {
   const res = await fetch(`/api/channels/${channelId}/messages`)
   if (res.ok) {
      const data = await res.json()
      dispatch(getChannelMessages(data))
      return
   }
};

export const addChannelMessageThunk = (payload) => async (dispatch) => {
   const res = await fetch(`/api/channels/${payload.channelId}/messages/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
   })
   if (res.ok) {
      const data = await res.json();
      dispatch(addMessage(data));
      return
   } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
         return data.errors;
      }
   } else {
      return ['An error occurred. Please try again.']
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
         newState[channelId] = { ...action.payload.messages }
         return newState;
      }
      case ADD_MESSAGE: {
         console.log(action.payload, '============ ACTION PAYLOAD')
         const message = action.payload;
         const newState = {
            ...state
         }
         newState[message.channel_id] = {...state[message.channel_id]}
         newState[message.channel_id][message.id] = {...message}
         return newState
      }
      default:
         return state
   }
};

export default messagesReducer;
