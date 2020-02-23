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
            
            return [...state, action.payload];
        case actionTypes.EDIT_MEMO:
            return state.map ((item, index) => {
                if (item.id !== action.payload.id) {
                    return item
                }

                let a = {...item, ...action.payload};

                console.log(a);

                return {
                    ...item,
                    ...action.payload
                }
            })
           
        default: 
            return state;
    }
}

export default memoReducer;