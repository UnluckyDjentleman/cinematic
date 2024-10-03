import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: {arr:{movieid: number|undefined, rating: number|undefined, userid: string|undefined|null}[]}={arr:[]}

export const ratingsReducer=createSlice({
    name: 'ratings',
    initialState,
    reducers:{
        setRatedMovies: (state, action: PayloadAction<{movieid: number|undefined, rating: number|undefined, userid: string}[]>)=>{
            state.arr=action.payload
        },
        addItem: (state, action: PayloadAction<{movieid: number|undefined, rating: number|undefined, userid: string|undefined|null}>)=>{
            state.arr=state.arr.concat(action.payload)
        },
        removeItem:(state, action: PayloadAction<{movieid: number|undefined, userid: string|undefined|null}>)=>{
            state.arr=state.arr.filter(item=>item!==action.payload);
        },
        updateItem:(state, action: PayloadAction<{movieid: number|undefined, rating: number|undefined, userid: string|undefined|null}>)=>{
            state.arr[action.payload.movieid as number]=action.payload
        }
    }
})

export const {addItem, setRatedMovies, removeItem, updateItem} = ratingsReducer.actions

export default ratingsReducer.reducer;