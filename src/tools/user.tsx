import { DB_URL } from "../Datas/urls"
import { User } from "../types/Objects"
import { getFetchRequest, postFetchRequest } from "./fetch"

export async function checkUser(login: string, password: string): Promise<User | string> {
	const res = await postFetchRequest<User>(DB_URL + "user/login", {
		login: login,
		password: password,
	})
	return res
}
export async function tokenCheck(): Promise<boolean> {
	const user = await getFetchRequest<User>(DB_URL + "user/getOne")
	return typeof user !== "string"
}
