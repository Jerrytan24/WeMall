import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex)
const actions = {
	user(context, value) {
		context.commit('USER', value)
	},
	userId(context, value) {
		context.commit('USERID', value)
	},
	setMask(context, value) {
		context.commit('SETMASK', value);
	},
	setcartlist(context, value) {
		context.commit("SETCARTLIST", value)
	},
	setbookNameRec(context, value) {
		context.commit("SETBOOKNAMEREC", value);
	},
	setbookCartRec(context, value) {
		context.commit("SETBOOKCARTREC", value);
	},
	setbookOrderRec(context, value) {
		context.commit("SETBOOKORDERREC", value);
	},
	setsocketOpen(context,value){
		context.commit("SETSOCKETOPEN",value);
	},
	//////消息存储
	setfromUser(context,value){
		context.commit("SETFROMUSER",value);
	},
	setfromUserImage(context,value){
		context.commit("SETFROMUSERIMAGE",value);
	},
	setfromUserText(context,value){
		context.commit("SETFROMUSERTEXT",value);
	},
	setShowToast(context,value){
		context.commit("SETSHOWTOAST",value);
	},
}
const mutations = {
	SETSHOWTOAST(state,value){
		state.showToastMine = value;
	},
	SETSOCKETOPEN(state,value){
		state.socketOpen = value;
	},
	SETBOOKNAMEREC(state, value) {
		state.bookNameRec = value;
	},
	SETBOOKCARTREC(state, value) {
		state.bookCartRec = value;
	},
	SETBOOKORDERREC(state, value) {
		state.bookOrderRec = value;
	},
	USERID(state, value) {
		state.usernameId = value;
	},
	USER(state, value) {
		state.username = value;
	},
	SETMASK(state, value) {
		state.JerryMask = value;
	},
	SETCARTLIST(state, value) {
		state.cartList.unshift(value)
	},
	//////消息存储
	SETFROMUSER(state,value){
		state.fromUser.unshift(value);
	},
	SETFROMUSERIMAGE(state,value){
		state.fromUserImage = value;
	},
	SETFROMUSERTEXT(state,value){
		state.fromUserText.push(value);
	}
}
const state = {
	socketOpen:false,
	username: '',
	usernameId: 0,
	JerryMask: false,
	popShow: false,
	OrderShow: false,
	userImage: "", //详情页面中发布书籍的用户图片
	cartList: [], //购物车
	// 当前登录用户的消息列表
	bookNameRec: "",
	bookCartRec: "",
	bookOrderRec: "",
	/////消息存储
	fromUser:[],
	fromUserImage:[],
	fromUserText:[],
	showToastMine: false,
}
const store = new Vuex.Store({
	actions,
	mutations,
	state,
})

export default store;
