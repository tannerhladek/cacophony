// const declarations
const GET_SERVERS = 'servers/GET_SERVERS'

// action creators
const getServers = (servers) => ({
   action: GET_SERVERS,
   payload: servers
})

// thunk declarations
export const getServersThunk = (userId) => async (dispatch) => {
   const response = await fetch(`api/users/${userId}}/servers`);

   if (response.ok) {
      const servers = await response.JSON()
      dispatch(getServers(servers))
   } else {
      // TO DO: error handling from back-end
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
