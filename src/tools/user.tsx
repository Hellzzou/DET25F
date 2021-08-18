import { DB_URL } from "../Datas/datas"
import { getFetchRequest, postFetchRequest } from "./fetch"

export async function checkUser(login: string, password: string): Promise<any> {
	const res = await postFetchRequest(DB_URL + "user/login", {
		login: login,
		password: password,
	})
	return res
}
export async function tokenCheck(): Promise<boolean> {
	const user = await getFetchRequest(DB_URL + "user/getOne")
	return typeof user.error === "undefined"
}
