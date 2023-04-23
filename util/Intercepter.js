export const Inter = {
	judgement(username) {
		if (!username) {
			uni.showToast({
				title: "您还未登录"
			})
			return 0;
		} else {
			return 1;
		}
	},
	JerryAlert(title){
		return uni.showToast({
			title,
		})
	}
}
