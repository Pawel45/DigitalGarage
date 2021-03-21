export const state = () => ({
    valid: false,
  })

export const mutations = {
    validChange(state, temp){
        state.valid = temp;
    },
  }

export const actions = {
    validChange(state, temp){
        state.commit("validChange", temp)
    },
}

export const getters = {
    getValidation(state){
        return state.valid;
    },

}