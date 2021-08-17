export async function postFetchRequest(url: string, body: any) {
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + sessionStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		})
		if (!res) throw new Error("PostFetchError")
		return await res.json()
	} catch (error) {
		console.log(error)
	}
}
export async function getFetchRequest(url: string) {
	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + sessionStorage.getItem("token"),
			},
		})
		if (!res) throw new Error("GetFetchError")
		return await res.json()
	} catch (error) {
		console.log(error)
	}
}
export async function deleteFetchRequest(url: string, body: any) {
	try {
		const res = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + sessionStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		})
		if (!res) throw new Error("DeleteFetchError")
		return await res.json()
	} catch (error) {
		console.log(error)
	}
}
export async function putFetchRequest(url: string, body: any) {
	try {
		const res = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + sessionStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		})
		if (!res) throw new Error("PutFetchError")
		return await res.json()
	} catch (error) {
		console.log(error)
	}
}
