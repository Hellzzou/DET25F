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

export const QOG = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [QOGFlights, setQOGFlights] = useState<Record<string, { dayDuration: number; nightDuration: number }>[]>()
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const underGroups = await getFetchRequest(DB_URL + "groups/distinctUnderGroup")
			const yearFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: new Date(new Date().getFullYear(), 0, 1),
				endDate: new Date(),
			})
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
