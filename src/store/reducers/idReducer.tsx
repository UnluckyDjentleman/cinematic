import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: {id: number|undefined}={id: undefined}

export const idReducer=createSlice({
    name: 'id',
    initialState,
    reducers:{
        setId: (state, action: PayloadAction<number|undefined>)=>{
            state.id=action.payload
        }
    }
})

export const {setId} = idReducer.actions

export default idReducer.reducer; 