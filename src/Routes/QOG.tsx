/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { DebriefedflightDateFinderURL, distinctUnderGroupURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { QOGTable } from "../Sections/QOGTable"
import { buildQOG } from "../tools/buildReports"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { Duration, Flight } from "../types/Objects"

export const QOG = (): JSX.Element => {
	const history = useHistory()
	const [token, setToken] = useState(true)
	const [QOGFlights, setQOGFlights] = useState<Record<string, Duration>[]>()
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const underGroups = await getFetchRequest<string[]>(distinctUnderGroupURL)
			const yearFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
				startDate: new Date(new Date().getFullYear(), 0, 1),
				endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
			})
			if (typeof underGroups !== "string" && typeof yearFlights !== "string")
				setQOGFlights(buildQOG(yearFlights, underGroups))
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			{QOGFlights && <QOGTable flights={QOGFlights!} />}
			<div className='row justify-content-center'>
				<Button
					size={3}
					buttonColor='primary'
					buttonContent='Statistiques'
					onClick={() => history.push("/stats")}
				/>
			</div>
		</div>
	)
}
