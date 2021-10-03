import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { DebriefedflightDateFinderURL, distinctUnderGroupURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { buildWeekReport } from "../tools/buildReports"
import { groupColor, hebdoColor } from "../tools/colorManager"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import {
	sumGroup,
	sumGroupByWeek,
	underGroupFilter,
	weekReport,
	weekReportByUnderGroups,
	weekReportByWeek,
	weekReportNight,
	weekReportNightByWeek,
} from "../tools/reportCalculator"
import { Duration, Flight } from "../types/Objects"

export const CRHebdo = (): JSX.Element => {
	const [underGroups, setUnderGroups] = useState<string[]>(["110"])
	const [flights, setFlights] = useState<Record<string, Duration>[]>()
	useAsyncEffect(async () => {
		const underGroups = await getFetchRequest<string[]>(distinctUnderGroupURL)
		const yearFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
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
		<div className='alegreya'>
			<MainNavBar />
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
					{["1", "2", "3"].map((group) => (
						<>
							{underGroupFilter(underGroups, group).map((underGroup) => (
								<tr
									key={underGroups?.indexOf(underGroup)}
									className={`text-center table-${hebdoColor(underGroup)}`}>
									<td>{underGroup}</td>
									{!!flights &&
										flights.map((flight) => (
											<td key={flights.indexOf(flight)}>
												{(
													flight[underGroup].dayDuration + flight[underGroup].nightDuration
												).toFixed(1)}
											</td>
										))}
									<td>{!!flights && weekReportByUnderGroups(flights, underGroup).toFixed(1)}</td>
								</tr>
							))}
							<tr className={`text-center ${groupColor(group)}`}>
								<td>Total</td>
								{!!flights &&
									sumGroupByWeek(flights, underGroupFilter(underGroups, group)).map((week) => (
										<td
											key={sumGroupByWeek(flights, underGroupFilter(underGroups, group)).indexOf(
												week
											)}>
											{week.toFixed(1)}
										</td>
									))}
								<td>
									{!!flights && sumGroup(flights, underGroupFilter(underGroups, group)).toFixed(1)}
								</td>
							</tr>
						</>
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
					<tr className='text-center'>
						<th>DONT NUIT</th>
						{!!flights &&
							flights.map((flight) => (
								<th key={flights.indexOf(flight)}>
									{weekReportNightByWeek(flight, underGroups).toFixed(1)}
								</th>
							))}
						<th>{!!flights && weekReportNight(flights, underGroups).toFixed(1)}</th>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}
