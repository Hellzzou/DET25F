/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { QOGTable } from "../Sections/QOGTable"
import { buildQOG } from "../tools/buildReports"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { Duration, flight } from "../types/Objects"

export const QOG = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [QOGFlights, setQOGFlights] = useState<Record<string, Duration>[]>()
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const underGroups = await getFetchRequest<string[]>(DB_URL + "groups/distinctUnderGroup")
			const yearFlights = await postFetchRequest<flight[]>(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: new Date(new Date().getFullYear(), 0, 1),
				endDate: new Date(),
			})
			if (typeof underGroups !== "string" && typeof yearFlights !== "string")
				setQOGFlights(buildQOG(yearFlights, underGroups))
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			{QOGFlights && <QOGTable flights={QOGFlights!} />}
		</>
	)
}
