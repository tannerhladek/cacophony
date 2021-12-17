// CONST DECLARATIONS
// server consts
const GET_SERVERS = 'servers/GET_SERVERS';
const REMOVE_SERVERS = 'servers/REMOVE_SERVERS';
const ADD_SERVER = 'servers/ADD_SERVER';
const DELETE_SERVER = 'servers/DELETE_SERVER';


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

const deleteServer = (data) => ({
   type: DELETE_SERVER,
   payload: data
});

const removeServers = () => ({
   type: REMOVE_SERVERS,
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
      default:
         return state
   }
};

export default serverReducer;
