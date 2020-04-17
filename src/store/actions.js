import { ADD_COUNTER,ADD_TO_CART } from './mutations-type'

export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      if(product){         // 不是第一次添加  
        context.commit(ADD_COUNTER,product)
        resolve('商品数量加一')
      } else {             // 第一次添加
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('商品已加入购物车')
      }
    })
  }
}