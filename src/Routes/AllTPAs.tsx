import React from "react"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { buildAllTPAs } from "../tools/buildAllTPAs"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"

export const AllTPAs = (): JSX.Element => {
	useAsyncEffect(async () => {
		const endDate = new Date(Date.now())
		const startDate = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
		const allDebriefedFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
			startDate: startDate,
			endDate: endDate,
		})
		const allMembers = await getFetchRequest(DB_URL + "crewMembers")
		const TPAs = buildAllTPAs(allMembers, allDebriefedFlights)
		console.log(TPAs)
	}, [])
	return (
		<div>
			<Header />
			<Navbar />
			AllTPAs
		</div>
	)
}
