import {
	JerryRequest
} from './api.js';
import {
	JerrySecond
} from "./api.js"
export const api = {
	insertBookCollect(book_id, number) { //插入书的api
		JerryRequest({
			url: '/insertBookCollect?book_id=' + book_id + "&number=" + number,
			method: "PUT",
			token:uni.getStorageSync("token")
		})
	},
	insertUserCart(user_id, book_id,seller_id) { //插入收藏的api
		JerrySecond({
			url: "/insertUserCart",
			token:uni.getStorageSync("token"),
			data: {
				user_id,
				book_id,
				seller_id,
			}
		})
	},
	insertUserOrder(book_id, num, price, user_id,seller_id,username,mobile,address,day) { //插入用户订单的api
		JerrySecond({
			url: "/insertUserOrder",
			token:uni.getStorageSync("token"),
			data: {
				book_id,
				num,
				price,
				user_id,
				seller_id,
				username,
				mobile,
				address,
				day,
			}
		})
	},
	insertUserOrderList(user_id, list) {
		JerrySecond({
			url: "/insertUserOrderList",
			token:uni.getStorageSync("token"),
			contentType:'application/json',
			data: {
				list:list,
				user_id,
			}
		})
	},
	deleteOrderComplete(id){
		JerryRequest({
			url:"/deleteOrderComplete?id="+id,
			method:"DELETE",
			token:uni.getStorageSync("token")
		})
	},
	insertBookByUser(image,title,author,price,cate_id,user_id,collect,num,number,flag){
		JerrySecond({
			url:"/insertBookByUser",
			token:uni.getStorageSync("token"),
			data:{
				image,
				title,
				author,
				price,
				cate_id,
				user_id,
				collect,
				num,
				number,
				flag
			}
		})
	},
	insertMessage(list){
		JerrySecond({
			url:"/insertMessage",
			token:uni.getStorageSync("token"),
			data:{
				list:list,
			},
			contentType:'application/json',
		})
	},
	insertReplyMsg(list){
		JerrySecond({
			url:"/insertReplyMsg",
			token:uni.getStorageSync("token"),
			contentType:'application/json',
			data:{
				list,
			}
		})
	},
	//fans操作
	insertAttent(user_id,seller_id){
		JerrySecond({
			url:"/insertAttent",
			token:uni.getStorageSync("token"),
			data:{
				user_id,
				seller_id,
			}
		})
	},
	updateAttent(seller_id,number){
		JerryRequest({
			method:"PUT",
			url:"/updateUserByFans?number="+number+"&seller_id="+seller_id,
			token:uni.getStorageSync("token"),
		})
	},
	deleteAttent(user_id,seller_id){
		JerryRequest({
			url:"/deleteAttentById?user_id="+user_id+"&seller_id="+seller_id,
			token:uni.getStorageSync("token"),
			method:"DELETE"
		})
	},
	insertOrderRefund(list){
		JerrySecond({
			url:"/insertOrderRefund",
			token:uni.getStorageSync("token"),
			contentType:'application/json',
			data:{
				list,
			}
		})
	},
	deleteOrderRefund(order_id){
		JerryRequest({
			url:"/deleteOrderRefund?order_id="+order_id,
			token:uni.getStorageSync("token"),
			method:"DELETE"
		})
	},
	updatePageView(seller_id,day){
		JerryRequest({
			url:"/updatePageView?seller_id="+seller_id+"&day="+day,
			token:uni.getStorageSync("token"),
			method:"PUT"
		})
	},
	insertSellerOrderComplete(list){
		JerrySecond({
			url:"/insertSellerOrderComplete",
			token:uni.getStorageSync("token"),
			contentType:'application/json',
			data:{
				list,
			}
			
		})
	},
	insertOrderComplete(list){
		JerrySecond({
			url:"/insertOrderComplete",
			token:uni.getStorageSync("token"),
			contentType:'application/json',
			data:{
				list,
			}
			
		})
	},
	insertPageView(seller_id,number,day){
		JerrySecond({
			url:"/insertPageView",
			data:{
				seller_id,
				number,
				day,
			},
			token:uni.getStorageSync("token"),
		})
	}
	
}
