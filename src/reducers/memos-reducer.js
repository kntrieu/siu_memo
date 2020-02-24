import actionTypes from '../actions/actionTypes'
const memos = [
    {
        id: 1,
        name: "Test",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        created_date: "2020-02-21T06:45:58.022Z",
    },

    {
        id: 2,
        name: "Test 2",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        created_date: "2020-02-21T06:45:58.022Z",
    }
]

const memoReducer = (state = memos, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_MEMO:
            action.payload.id = state.length + 1;
            return [...state, action.payload];
        case actionTypes.SAVE_MEMO:
            return state.map((item) => {
                if (item.id !== action.payload.id) {
                    return item;
                }

                return {
                    ...item, ...action.payload
                }
            })
        case actionTypes.DELETE_MEMO:
            return state.filter((item) => item.id !== action.payload.id)
        default: 
            return state;
    }
}

export default memoReducer;