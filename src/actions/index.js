import actionTypes from './actionTypes';



//Action creator

//Add new memo
export const addNewMemo = () => {
    return {
        type: actionTypes.ADD_NEW_MEMO,
        payload: {
            id: 3,
            name: "New memo",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            created_date: "2020-02-21T06:45:58.022Z",
        }
    }
}


export const selectMemo = (memo) => {
    console.log(memo);
    return {
        type: actionTypes.SELECT_MEMO,
        payload: memo
    }
}