import {getProducts} from "../api/api";

export const moduleProducts = {
    state: {
        products: [],
        // firstProductIndex: 0, // needs in cache case
        totalCount: 0,
        selectedPage: 1,
        productsInRow: 4,
        pagesInRow: 4,
    },
    getters: {
        // needs in cache case
        // GET_PRODUCTS: state => state.products.slice(state.firstProductIndex, state.firstProductIndex+state.productsInRow),
        GET_PRODUCTS: state => state.products.slice(0, state.productsInRow),
        GET_TOTAL_COUNT: state => state.totalCount,
        GET_SELECTED_PAGE: state => state.selectedPage,
        GET_PRODUCTS_IN_ROW: state => state.productsInRow,
        GET_PAGES_IN_ROW: state => state.pagesInRow,
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        // needs in cache case
        // ADD_PRODUCTS(state, products) {
        //     products.forEach((el) => {
        //         state.products.push(el)
        //     })
        // },
        // SET_FIRST_PRODUCT_INDEX(state, index) {
        //     state.firstProductIndex = index
        // },
        SET_TOTAL_COUNT(state, total) {
            state.totalCount = total
        },
        SET_SELECTED_PAGE(state, selected) {
            state.selectedPage = selected
        },
        SET_PRODUCTS_IN_ROW(state, products) {
            state.productsInRow = products
        },
        SET_PAGES_IN_ROW(state, step) {
            state.pagesInRow = step
        },
    },
    actions: {
        async SELECT_PAGE({commit, state}, selectedPage) {
            commit('SET_SELECTED_PAGE', selectedPage)
            let firstIndex = (selectedPage - 1) * state.productsInRow
            // needs in cache case
            // commit('SET_FIRST_PRODUCT_INDEX', firstIndex)

            try {
                const data = await getProducts(firstIndex)
                commit('SET_PRODUCTS', data.products)
                commit('SET_TOTAL_COUNT', data.totalCount)
            } catch (error) {
                console.log('error', error)
            }

            // needs in cache case
            // while (state.products.length <= firstIndex+state.productsInRow && state.products.length < state.totalCount) {
            //     try {
            //         const data = await getProducts(state.products.length)
            //         commit('ADD_PRODUCTS', data.products)
            //     } catch (error) {
            //         console.log('error', error)
            //     }
            // }
        },
        SET_PRODUCTS_IN_ROW({commit}, productsInRow) {
            commit('SET_PRODUCTS_IN_ROW', productsInRow)
        },
        SET_PAGES_IN_ROW({commit}, pagesInRow) {
            commit('SET_PAGES_IN_ROW', pagesInRow)
        },
    },

}
