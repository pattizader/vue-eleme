import axios from '../../axios/index'
const state = {
  allGoods: [],
  isShowFood: false
}

const getters = {
  showFood: state => state.isShowFood,
  goodsList: state => state.allGoods,
  foodsList (state) {
    let foods = []
    state.allGoods.forEach((item) => {
      item.foods.forEach((food) => {
        foods.push({
          name: food.name,
          price: food.price,
          quantity: food.quantity
        })
      })
    })
    return foods
  }
}

const actions = {
  getAllGoods ({state}) {
    axios.commonApi('/api/goods').then(goods => {
      state.allGoods = goods
    })
  }
}

const mutations = {
  addFood (state, {name}) {
    state.allGoods.forEach((item) => {
      if (item.foods.find(food => food.name === name)) {
        const selected = item.foods.find(food => food.name === name)
        selected.quantity++
      }
    })
  },
  decreaseFood (state, {name}) {
    state.allGoods.forEach((item) => {
      if (item.foods.find(food => food.name === name)) {
        const selected = item.foods.find(food => food.name === name)
        selected.quantity--
      }
    })
  },
  showFoodDetail (state) {
    state.isShowFood = true
    console.log(state.isShowFood)
  },
  closeFoodDetail (state) {
    state.isShowFood = false
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
