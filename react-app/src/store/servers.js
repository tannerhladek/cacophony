// CONST DECLARATIONS
// server consts
const GET_SERVERS = 'servers/GET_SERVERS';
const REMOVE_SERVERS = 'servers/REMOVE_SERVERS';
const ADD_SERVER = 'servers/ADD_SERVER';
const DELETE_SERVER = 'servers/DELETE_SERVER';
const EDIT_SERVER = 'servers/EDIT_SERVER';

// channel consts
const ADD_CHANNEL = 'servers/ADD_CHANNEL';
const EDIT_CHANNEL = 'servers/EDIT_CHANNEL';
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
export const addChannel = (data) => ({
   type: ADD_CHANNEL,
   payload: data
});

export const editChannel = (data) => ({
   type: EDIT_CHANNEL,
   payload: data
});

export const deleteChannel = (data) => ({
   type: DELETE_CHANNEL,
   payload: data
});


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
      // return ['An error occurred. Please try again.']
      return ['This server name already exists.']
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
export const addChannelThunk = (payload) => async (dispatch) => {
   const res = await fetch(`/api/servers/${payload.serverId}/channels/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
   });
   if (res.ok) {
      const data = await res.json();
      dispatch(addChannel(data));
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

export const editChannelThunk = (payload) => async (dispatch) => {
   const res = await fetch(`/api/channels/${payload.id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
   });
   if (res.ok) {
      const data = await res.json();
      dispatch(editChannel(data));
      return null;
   } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
         return data.errors;
      }
   } else {
      return ['An error occurred. Please try again.']
   }
}


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
            [action.payload.id]: { ...state[action.payload.id], ...action.payload }
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
      case ADD_CHANNEL: {
         const serverId = action.payload.server_id;
         const channelId = action.payload.id
         const newState = {
            ...state,
            [serverId]: {...state[serverId], 'channels':{...state[serverId].channels, [channelId]: {...action.payload}}}
         }
         return newState;
      }
      case EDIT_CHANNEL: {
         const serverId = action.payload.server_id;
         const channelId = action.payload.id
         const newState = {
            ...state,
            [serverId]: {...state[serverId], 'channels':{...state[serverId].channels, [channelId]: {...action.payload}}}
         }
         return newState;
      }
      case DELETE_CHANNEL: {
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
