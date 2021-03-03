export const state = () => ({
    filters: {
        manufacturer: '',
        model: '',
    },
  })

export const mutations = {
    changeFilters(state, {manu, model}){
        state.filters.manufacturer = manu;
        state.filters.model = model;
    },
  }

export const actions = {
    changeFilter(state, {manu, model}){
        state.commit("changeFilters", {manu, model})
    },
}

export const getters = {
    getFilters(state){
        return state.filters;
    },

}