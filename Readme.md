# redux-action-creator

## Install
```
yarn add @wayrunner/redux-action-creator
```

## Usage

### ```createActionCreator(type, argumentMapping?, reducer?)```
Create a new action creator:
```js
import {createActionCreator} from "@wayrunner/redux-action-creator";

const fetchData = createActionCreator('FETCH_DATA')
fetchData(1) // -> { type: 'FETCH_DATA' }

const add = createActionCreator('ADD', 'toAdd')
add(1) // -> { type: 'ADD', toAdd: 1 }

const add2 = createActionCreator('ADD2', ['a','b'])
add2(3,4) // -> { type: 'ADD', a: 3, b:4 }

const multiply = createActionCreator('MULTIPLY', (times=1) => {times})
multiply() // -> { type: 'ADD', times: 1 }

export const subtract = createActionCreator('SUBTRACT', 'x', ($$state, action) => {
  return {
    ...$$state,
    value: $$state.value - action.x
  }
})
```
The type can be accessed with: ```multiply.type```

### ```createAssignmentCreator(type, argumentMapping)```

Can use the same argument mappings as ```createActionCreator```. All arguments part of the mapping will be assigned to the state by the reducer.
```js
import {createAssignmentCreator} from "@wayrunner/redux-action-creator";

export const setValue = createAssignmentCreator('SET_VALUE', 'value')
```

### ```createActionReducer(actions)```
Create a new action creator:
```js
import {createActionReducer} from "@wayrunner/redux-action-creator";
import * as actions from './actions'

const reducer = createActionReducer(actions) // Or createActionReducer([actions.setValue, actions.subtract])

reducer({value: 10}, actions.subtract(2)) // -> { value: 8 }
reducer({value: 10}, actions.setValue(20)) // -> { value: 20 }
```

### ```createMapDispatchToProps(mapping)```
Can be used to automatically add actions to props

```js
import {createMapDispatchToProps} from "@wayrunner/redux-action-creator";
import {subtract, setValue} from './actions'

const mapDispatchToProps = createMapDispatchToProps({
  subtractValue: subtract,
  setValue
})

//...

props.setValue(100)
props.subtractValue(10)
```