import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phys: null,
  chem: null,
  comp: null,
  trending: null,
};

const experimentSlice = createSlice({
  name: "experiment",
  initialState,
  reducers: {
    setExperiments: (state, action) => {
      state.phys = action.payload.phys;
      state.chem = action.payload.chem;
      state.comp = action.payload.comp;
      state.trending = action.payload.trending;
    },
  },
});

export const { setExperiments } = experimentSlice.actions;

export const selectPhy = (state) => state.experiment.phys;
export const selectChem = (state) => state.experiment.chem;
export const selectComp = (state) => state.experiment.comp;
export const selectTrending = (state) => state.experiment.trending;

export default experimentSlice.reducer;
