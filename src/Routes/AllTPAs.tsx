import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { buildAllTPAs } from "../tools/buildAllTPAs"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"

export const AllTPAs = (): JSX.Element => {
	const [token, setToken] = useState(true)
	useAsyncEffect(async () => {
		const endDate = new Date(Date.now())
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const startDate = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
			const allDebriefedFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: startDate,
				endDate: endDate,
			})
			const allMembers = await getFetchRequest(DB_URL + "crewMembers")
			const TPAs = buildAllTPAs(allMembers, allDebriefedFlights)
			console.log(TPAs)
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div>
			<Header />
			<Navbar />
			AllTPAs
		</div>
	)
}
