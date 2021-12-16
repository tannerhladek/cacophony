// const declarations
const GET_SERVERS = 'servers/GET_SERVERS'

// action creators
const getServers = (servers) => ({
   type: GET_SERVERS,
   payload: servers
})

// thunk declarations
export const getServersThunk = (userId) => async (dispatch) => {
   const response = await fetch(`api/users/${userId}/servers`);

   if (response.ok) {
      const servers = await response.json()
      dispatch(getServers(servers));
      return servers
   }
}

// reducer
const inistialState = {}
const serverReducer = (state = inistialState, action) => {
   switch (action.type) {
      case GET_SERVERS:
         const newState = {
            ...state,
            ...action.payload.servers
         }
         return newState
      default:
         return state
   }
};

export default serverReducer;
