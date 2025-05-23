const state = {
    product: null
}

const mutations = {
    SET_PRODUCT: (state, product) => {
        state.product = product
    }
}

const actions = {
    updateProduct({commit}, product) {
        commit('SET_PRODUCT', product)
    }
}


export default {
    namespaced: true, state, mutations, actions
}