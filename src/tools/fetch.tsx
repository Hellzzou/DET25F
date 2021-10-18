export async function postFetchRequest<Type>(url: string, body: unknown): Promise<Type> {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer: " + sessionStorage.getItem("token"),
		},
		body: JSON.stringify(body),
	})
	return await res.json()
}
export async function getFetchRequest<Type>(url: string): Promise<Type> {
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer: " + sessionStorage.getItem("token"),
		},
	})
	return await res.json()
}
export async function deleteFetchRequest<Type>(url: string, body: unknown): Promise<Type> {
	const res = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer: " + sessionStorage.getItem("token"),
		},
		body: JSON.stringify(body),
	})
	return await res.json()
}
export async function putFetchRequest<Type>(url: string, body: unknown): Promise<Type> {
	const res = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer: " + sessionStorage.getItem("token"),
		},
		body: JSON.stringify(body),
	})
	return await res.json()
}
