export const createMapDispatchToProps = mapping => dispatch => {
  return Object.entries(mapping).reduce((acc, [key, actionCreator]) => ({
    ...acc,
    [key]: (...args) => dispatch(actionCreator(...args))
  }), {})
}

const createCreator = (type, argMapping) => {
  if (!argMapping) {
    return () => ({type})
  } else if (Array.isArray(argMapping)) {
    return (...args) => argMapping.reduce((acc, name, i) => ({
      ...acc,
      [name]: args[i]
    }), {type})
  } else if (typeof argMapping === 'string') {
    return (arg) => ({
      type,
      [argMapping]: arg
    })
  } else if(typeof argMapping === "function"){
    return (...args) => ({
      type,
      ...argMapping(...args)
    })
  }else{
    throw `Can not create action creator with ${argMapping}`
  }
}

export function createActionCreator(type, actionCreator, actionReducer) {
  const action = createCreator(type, actionCreator)
  action.reducer = actionReducer
  action.type = type
  return action
}

const assignmentReducer = (state, {type, ...args}) => state.merge ? state.merge(args) : {...state, ...args}
export function createAssignmentCreator(type, actionCreator) {
  return createActionCreator(type, actionCreator, assignmentReducer)
}

export function createActionReducer(actions, initialState = undefined) {
  const operationMap = (Array.isArray(actions) ? actions : Object.values(actions)).reduce((acc, operation) => ({
    ...acc,
    [operation.type]: operation.reducer
  }), {})
  return (state = initialState, action) => {
    const reducer = operationMap[action.type]
    return reducer ? reducer(state, action) : state
  }
}