export async function postFetchRequest<Type>(url: string, body: unknown): Promise<Type | string> {
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + sessionStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		})
		if (!res) return "PostFetchError"
		return await res.json()
	} catch (error) {
		return "PostFetchError"
	}
}
export async function getFetchRequest<Type>(url: string): Promise<Type | string> {
	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + sessionStorage.getItem("token"),
			},
		})
		if (!res) return "getFetchError"
		return await res.json()
	} catch (error) {
		return "getFetchError"
	}
}
export async function deleteFetchRequest<Type>(url: string, body: unknown): Promise<Type | string> {
	try {
		const res = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + sessionStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		})
		if (!res) return "PostFetchError"
		return await res.json()
	} catch (error) {
		return "PostFetchError"
	}
}
export async function putFetchRequest<Type>(url: string, body: unknown): Promise<Type | string> {
	try {
		const res = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + sessionStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		})
		if (!res) return "PostFetchError"
		return await res.json()
	} catch (error) {
		return "PostFetchError"
	}
}
