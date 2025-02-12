const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodState = {
        ...state,
        good: state.good + 1
      }
      return goodState
    case 'OK':
      let okState = {
        ...state,
        ok: state.ok + 1
      }
      return okState
    case 'BAD':
      let badState = {
        ...state,
        bad: state.bad + 1
      }
      return badState
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
