
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data:{}
}

const FormSlice = createSlice({
    name:"RegisterData",
    initialState,
    reducers:{
         SaveFormData:(state,action)=>{
            state.data=action.payload
         }
    }

})

export const { SaveFormData} = FormSlice.actions

export default FormSlice.reducer