import common from '../common.js'

// const baseUrl = 'http://127.0.0.1:8000/'
const baseUrl = common.baseUrl

export async function postData(url, data) {

	let res = await uni.request({
		url: baseUrl + url,
		method: 'POST',
		data: data,
		header: {
			'content-type': 'application/json',
		}
	});
	return res[1].data

}


export async function getData(url) {
	let res = await uni.request({
		url: baseUrl + url,
		method: 'GET',
	});
	return res[1].data
}
