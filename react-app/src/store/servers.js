// CONST DECLARATIONS
// server consts
const GET_SERVERS = 'servers/GET_SERVERS';
const REMOVE_SERVERS = 'servers/REMOVE_SERVERS';
const ADD_SERVER = 'servers/ADD_SERVER';
const DELETE_SERVER = 'servers/DELETE_SERVER';
const EDIT_SERVER = 'servers/EDIT_SERVER';

// channel consts
const DELETE_CHANNEL = 'servers/DELETE_CHANNEL';


// ACTION CREATORS
// server action creators
const getServers = (servers) => ({
   type: GET_SERVERS,
   payload: servers
});

const addServer = (server) => ({
   type: ADD_SERVER,
   payload: server
});

const editServer = (server) => ({
   type: EDIT_SERVER,
   payload: server
})

const deleteServer = (data) => ({
   type: DELETE_SERVER,
   payload: data
});

const removeServers = () => ({
   type: REMOVE_SERVERS,
});

// channel action creators
const deleteChannel = (data) => ({
   type: DELETE_CHANNEL,
   payload: data
})


// THUNK DECLARATIONS
// server thunks
export const getServersThunk = (userId) => async (dispatch) => {
   const response = await fetch(`/api/users/${userId}/servers`);

   if (response.ok) {
      const servers = await response.json()
      dispatch(getServers(servers));
      return null;
   }
};

export const addServerThunk = (payload) => async (dispatch) => {
   const res = await fetch('/api/servers/new', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
   });

   if (res.ok) {
      const data = await res.json();
      dispatch(addServer(data));
      return data.id;
   } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
         return data.errors;
      }
   } else {
      return ['An error occurred. Please try again.']
   }
};

export const editServerThunk = (payload) => async (dispatch) => {
   const res = await fetch(`/api/servers/${payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
   });

   if (res.ok) {
      const data = await res.json();
      dispatch(editServer(data));
      return null;
   } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
         return data.errors;
      }
   } else {
      return ['An error occurred. Please try again.']
   }
};

export const deleteServerThunk = (serverId) => async (dispatch) => {
   const res = await fetch(`/api/servers/${serverId}/delete`, {
      method: "DELETE",
   });

   if (res.ok) {
      const data = await res.json();
      dispatch(deleteServer(data));
      return null;
   } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
         return data.errors;
      }
   } else {
      return ['An error occurred. Please try again.']
   }
};

export const removeServersThunk = () => (dispatch) => {
   dispatch(removeServers());
   return null
};

// channel thunks
export const deleteChannelThunk = (channelId) => async (dispatch) => {
   const res = await fetch(`/api/channels/${channelId}/delete`, {
      method: "DELETE"
   });
   if (res.ok) {
      const data = await res.json()
      dispatch(deleteChannel(data));
      return null;
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
const serverReducer = (state = inistialState, action) => {
   switch (action.type) {
      case GET_SERVERS: {
         const newState = {
            ...state,
            ...action.payload.servers
         }
         return newState;
      }
      case ADD_SERVER: {
         const newState = {
            ...state,
            [action.payload.id]: action.payload
         };
         return newState;
      }
      case EDIT_SERVER: {
         const newState = {
            ...state,
            [action.payload.id]: {...state[action.payload.id], ...action.payload}
         };
         return newState;
      }
      case DELETE_SERVER: {
         const newState = {
            ...state
         };
         delete newState[action.payload.server_id]
         return newState
      }
      case REMOVE_SERVERS: {
         return {};
      }
      case DELETE_CHANNEL: {
         // const newState = {
         //    ...state,
         //    [action.payload.server_id]: {...state[action.payload.server_id], 'channels': action.payload.channels}
         // }
         const newState = {
            ...state
         }
         delete newState[action.payload.server_id].channels[action.payload.channel_id]
         return newState
      }
      default:
         return state
   }
};

export default serverReducer;
