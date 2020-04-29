// 全局引入 svgIcon 组件
import Vue from 'vue'
import svgIcon from '@/components/common/icon/svgIcon.vue'
Vue.component('svg-icon', svgIcon)

// 设置icons/svg下面的图片自动导入
const req = require.context('./svg', false, /\.svg$/);
req.keys().map(req);