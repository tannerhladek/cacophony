// const declarations
const GET_SERVERS = 'servers/GET_SERVERS'
const REMOVE_SERVERS = 'servers/REMOVE_SERVERS'

// action creators
const getServers = (servers) => ({
   type: GET_SERVERS,
   payload: servers
});

const removeServers = () => ({
   type: REMOVE_SERVERS,
})

// thunk declarations
export const getServersThunk = (userId) => async (dispatch) => {
   const response = await fetch(`api/users/${userId}/servers`);

   if (response.ok) {
      const servers = await response.json()
      dispatch(getServers(servers));
      return servers
   }
};

export const removeServersThunk = () => (dispatch) => {
   dispatch(removeServers());
   return
};

// reducer
const inistialState = {}
const serverReducer = (state = inistialState, action) => {
   switch (action.type) {
      case GET_SERVERS:
         const newState = {
            ...state,
            ...action.payload.servers
         }
         return newState;
      case REMOVE_SERVERS:
         return {};
      default:
         return state
   }
};

export default serverReducer;
