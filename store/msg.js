import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex)
const actions = {
	setfromUser(context,value){
		context.commit("SETFROMUSER",value);
	},
	setfromUserImage(context,value){
		context.commit("SETFROMUSERIMAGE",value);
	},
	setfromUserText(context,value){
		context.commit("SETFROMUSERTEXT",value);
	},
}
const mutations = {
	SETFROMUSER(state,value){
		state.fromUser = value;
	},
	SETFROMUSERIMAGE(state,value){
		state.fromUserImage = value;
	},
	SETFROMUSERTEXT(state,value){
		state.fromUserText = value;
	}
	
}
const state = {
	fromUser:[],
	fromUserImage:[],
	fromUserText:[],
}
const msgstore = new Vuex.Store({
	actions,
	mutations,
	state,
})

export default msgstore;

