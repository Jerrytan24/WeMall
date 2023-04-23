const baseUrl = "http://localhost:8080"
export const JerryRequest = (config) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + config.url,
			method: config.method || 'GET',
			data: config.data || {},
			header: {
				'satoken': config.token,
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			},
			success(res) {
				resolve(res)
			},
			fail(erro) {
				uni.showToast({
						title: "请求失败"
					}),
					reject(erro)
			}
		})
	})
}
const baseUrl2 = "http://localhost:8080"
export const JerrySecond = function(config) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl2 + config.url,
			method: "POST",
			data: config.data,
			header: {
				'content-type': config.contentType || 'application/x-www-form-urlencoded',
				'satoken': config.token
			},
			success(res) {
				resolve(res);
			},
			fail(erro) {
				reject(erro);
			}
		})
	})
}
