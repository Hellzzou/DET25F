import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { buildQOG } from "../tools/buildQOG"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"

export const QOG = (): JSX.Element => {
	const [QOGFlights, setQOGFlights] = useState()
	const [allGroups, setAllGroups] = useState()
	useAsyncEffect(async () => {
		const allGroups = await getFetchRequest(DB_URL + "groups")
		setAllGroups(allGroups)
		const yearFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
			startDate: new Date(new Date().getFullYear(), 0, 1),
			endDate: new Date(),
		})
		buildQOG(yearFlights, allGroups)
	}, [])
	return (
		<>
			<Header />
			<Navbar />
		</>
	)
}
