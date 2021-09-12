import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { buildWeekReport } from "../tools/buildReports"
import { hebdoColor } from "../tools/colorManager"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { weekReport, weekReportByUnderGroups, weekReportByWeek } from "../tools/reportCalculator"
import { flight } from "../types/Objects"

export const CRHebdo = (): JSX.Element => {
	const [underGroups, setUnderGroups] = useState<string[]>(["110"])
	const [flights, setFlights] = useState<Record<string, number>[]>()
	useAsyncEffect(async () => {
		const underGroups = await getFetchRequest<string[]>(DB_URL + "groups/distinctUnderGroup")
		const yearFlights = await postFetchRequest<flight[]>(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
			startDate: new Date(new Date().getFullYear(), 0, 1),
			endDate: new Date(),
		})
		if (typeof underGroups !== "string" && typeof yearFlights !== "string") {
			setUnderGroups(underGroups)
			const sortedFlights = buildWeekReport(yearFlights, underGroups)
			setFlights(sortedFlights)
		}
	}, [])
	return (
		<>
			<Header />
			<Navbar />
			<table className='table table-sm'>
				<thead className='table-secondary'>
					<tr>
						<th></th>
						<th className='text-center' colSpan={52}>
							SEMAINES
						</th>
						<th></th>
					</tr>
					<tr className='text-center'>
						<th>Groupe</th>
						{!!flights &&
							flights.map((flight) => (
								<th key={flights.indexOf(flight)}>{flights.indexOf(flight) + 1}</th>
							))}
						<th>TOTAL</th>
					</tr>
				</thead>
				<tbody>
					{!!underGroups &&
						underGroups.map((underGroup) => (
							<tr
								key={underGroups?.indexOf(underGroup)}
								className={`text-center table-${hebdoColor(underGroup)}`}>
								<td>{underGroup}</td>
								{!!flights &&
									flights.map((flight) => (
										<td key={flights.indexOf(flight)}>{flight[underGroup].toFixed(1)}</td>
									))}
								<td>{!!flights && weekReportByUnderGroups(flights, underGroup).toFixed(1)}</td>
							</tr>
						))}
				</tbody>
				<tfoot className='table-secondary'>
					<tr className='text-center'>
						<th>TOTAL</th>
						{!!flights &&
							flights.map((flight) => (
								<th key={flights.indexOf(flight)}>
									{weekReportByWeek(flight, underGroups).toFixed(1)}
								</th>
							))}
						<th>{!!flights && weekReport(flights, underGroups).toFixed(1)}</th>
					</tr>
				</tfoot>
			</table>
		</>
	)
}
