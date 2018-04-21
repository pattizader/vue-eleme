import Vue from 'vue'

const state = {
  cartList: [],
  showBtn: null
}

const getters = {
  CartList (state, getters) {
    return state.cartList.map(({name, quantity}) => {
      const food = getters.foodsList.find(food => food.name === name)
      return {
        name: food.name,
        price: food.price,
        quantity
        }
    })
  },
  cartTotalPrice (state, getter) {
    return getter.CartList.reduce((total, food) => {
      return total + food.price * food.quantity
    }, 0)
  },
  cartTotalCount (state, getter) {
    return getter.CartList.reduce((count, food) => {
      return count + food.quantity
    }, 0)
  }
}

const actions = {
  addFoodToCart ({state, commit}, food) {
    const cartItem = state.cartList.find(item => item.name === food.name)
    if (!cartItem) {
      commit('pushFoodToCart', {name: food.name, price: food.price})
    } else {
      commit('addFood', {name: food.name})
      commit('addFoodQuantity', {name: food.name})
    }
  },
  decreaseFoodOutCart ({state, commit}, food) {
    const cartItem = state.cartList.find(item => item.name === food.name)
    if (cartItem.quantity) {
      commit('cutFoodQuantity', {name: food.name})
      commit('decreaseFood', {name: food.name})
    }
  }
}

const mutations = {
  pushFoodToCart (state, {name, price}) {
    state.cartList.push({
      name,
      price,
      quantity: 1
    })
    state.showBtn = true
  },
  addFoodQuantity (state, {name}) {
    const cartItem = state.cartList.find(item => item.name === name)
    cartItem.quantity++
  },
  cutFoodQuantity (state, {name}) {
    const cartItem = state.cartList.find(item => item.name === name)
    cartItem.quantity--
  },
  emptyCart (state, food) {
    const cartItem = state.cartList.findIndex(item => item.name === food.name)
    state.cartList.splice(cartItem)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
