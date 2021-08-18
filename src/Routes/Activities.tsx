import React from "react"
import { Week } from "../Sections/Week"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { tokenCheck } from "../tools/user"
import { Redirect } from "react-router-dom"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"

export const Activities = (): JSX.Element => {
	const [token, setToken] = useState(true)
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		console.log(token)
		setToken(token)
	})
	return !token ? (
		<Redirect to='/' />
	) : (
		<div>
			<Header />
			<Navbar />
			<Week />
		</div>
	)
}
