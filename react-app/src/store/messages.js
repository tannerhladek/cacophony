// const declarations
const GET_CHANNEL_MESSAGES = 'messages/GET_MESSAGES';
const ADD_MESSAGE = 'messages/ADD_MESSAGE';
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE';
const EDIT_MESSAGE = 'messages/EDIT_MESSAGES';
const REMOVE_MESSAGES = 'messages/REMOVE_MESSAGES';


// action creators
const getChannelMessages = (data) => ({
   type: GET_CHANNEL_MESSAGES,
   payload: data
});

export const addMessage = (data) => ({
   type: ADD_MESSAGE,
   payload: data
});

export const deleteMessage = (data) => ({
   type: DELETE_MESSAGE,
   payload: data
});

export const editMessage = (data) => ({
   type: EDIT_MESSAGE,
   payload: data
});

const removeMessages = () => ({
   type: REMOVE_MESSAGES
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
      // commented out due to web socket dispatching actions
      // const data = await res.json();
      // dispatch(addMessage(data));
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

export const deleteMessageThunk = (payload) => async (dispatch) => {
   const res = await fetch(`/api/messages/${payload.id}/delete`, {
      method: "DELETE"
   });
   if (res.ok) {
      // commented out due to web socket dispatching actions
      // const data = await res.json();
      // dispatch(deleteMessage(data));
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

export const editMessageThunk = (payload) => async (dispatch) => {
   const res = await fetch(`/api/messages/${payload.id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
   });
   if (res.ok) {
      // commented out due to web socket dispatching actions
      // const data = await res.json();
      // dispatch(editMessage(data));
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

export const removeMessagesThunk = () => (dispatch) => {
   dispatch(removeMessages());
   return null
};


// reducer
const inistialState = {}
const messagesReducer = (state = inistialState, action) => {
   switch (action.type) {
      case GET_CHANNEL_MESSAGES: {
         const channelId = action.payload.channel_id
         const newState = { ...state }
         newState[channelId] = { ...action.payload.messages }
         return newState;
      }
      case ADD_MESSAGE: {
         const message = action.payload;
         const newState = { ...state }
         newState[message.channel_id] = { ...state[message.channel_id] };
         newState[message.channel_id][message.id] = { ...message };
         return newState;
      }
      case DELETE_MESSAGE: {
         const channelId = action.payload.channel_id;
         const messageId = action.payload.message_id;
         const newState = { ...state };
         delete newState[channelId][messageId];
         return newState;
      }
      case EDIT_MESSAGE: {
         const message = action.payload;
         const newState = { ...state }
         newState[message.channel_id] = { ...state[message.channel_id] };
         newState[message.channel_id][message.id] = { ...message };
         return newState;
      }
      case REMOVE_MESSAGES: {
         return {};
      }
      default:
         return state
   }
};

export default messagesReducer;
