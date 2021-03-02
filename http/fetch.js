const baseUrl = 'http://127.0.0.1:8000/'

	export async function postData(url, data) {
		let resp = await fetch(baseUrl + url, {
			body: JSON.stringify(data), // must match 'Content-Type' header
			headers: {
				'user-agent': 'Mozilla/4.0 MDN Example',
				'content-type': 'application/json'
			},
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
		})
		let res = await resp.json()
		return res
	}
	
	export async function getData(url) {
		let res = await fetch(baseUrl + url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
		})
		// console.log(res);
		let result = await res.json();
		// console.log(result);
		return result
	}
	
	
