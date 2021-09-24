/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { QOGRow } from "../Articles/QOGRow"
import { distinctGroupURL, groupURL } from "../Datas/urls"
import { INITIAL_GROUP } from "../Datas/initialObjects"
import { getFetchRequest } from "../tools/fetch"
import {
	allocSumOfAGroup,
	groupFilter,
	nightReportByCol,
	monthReportNight,
	sumQOGFlights,
	monthReportByCel,
} from "../tools/reportCalculator"
import { Group } from "../types/Objects"
import { QOGTableProps } from "../types/Sections"

export const QOGTable = (props: QOGTableProps): JSX.Element => {
	const [allGroups, setAllGroups] = useState<Group[]>(INITIAL_GROUP)
	const [allDistinctGroups, setAllDistinctGroups] = useState<string[]>([])
	useAsyncEffect(async () => {
		const allGroups = await getFetchRequest<Group[]>(groupURL)
		if (typeof allGroups !== "string") setAllGroups(allGroups)
		const allDistinctGroups = await getFetchRequest<string[]>(distinctGroupURL)
		if (typeof allDistinctGroups !== "string") setAllDistinctGroups(allDistinctGroups)
	}, [])
	return (
		<table className='table table-sm text-center align-middle border border-dark'>
			<thead className='table-secondary align-middle'>
				<tr>
					<th>Groupe</th>
					<th>Sous-groupe</th>
					<th>Rubrique</th>
					<th>Gestionnaires</th>
					<th>Clients</th>
					<th>Allocation</th>
					<th>Janv</th>
					<th>Fév</th>
					<th>Mars</th>
					<th>Avril</th>
					<th>Mai</th>
					<th>Juin</th>
					<th>Juil</th>
					<th>Août</th>
					<th>Sept</th>
					<th>Oct</th>
					<th>Nov</th>
					<th>Déc</th>
					<th>Conso cumulée</th>
					<th>Reliquat</th>
				</tr>
			</thead>
			<tbody className='my-2'>
				{allDistinctGroups.map((group) => (
					<QOGRow
						key={allDistinctGroups.indexOf(group)}
						groups={groupFilter(allGroups, group)}
						flights={props.flights}
						groupName={group}
					/>
				))}
			</tbody>
			<tfoot>
				<tr className='table-secondary'>
					<th className='text-end' colSpan={5}>
						Total tout groupe
					</th>
					<th>{allocSumOfAGroup(allGroups).toFixed(1)}</th>
					{props.flights.map((month) => (
						<th key={props.flights.indexOf(month)}>
							{monthReportByCel(props.flights, allGroups, props.flights.indexOf(month)).toFixed(1)}
						</th>
					))}
					<th>{sumQOGFlights(props.flights, allGroups).toFixed(1)}</th>
					<th>{(allocSumOfAGroup(allGroups) - sumQOGFlights(props.flights, allGroups)).toFixed(1)}</th>
				</tr>
				<tr className='table-secondary'>
					<th className='text-end' colSpan={5}>
						Dont nuit
					</th>
					<th></th>
					{props.flights.map((month) => (
						<th key={props.flights.indexOf(month)}>
							{nightReportByCol(props.flights, allGroups, props.flights.indexOf(month)).toFixed(1)}
						</th>
					))}
					<th>{monthReportNight(props.flights, allGroups).toFixed(1)}</th>
					<th></th>
				</tr>
			</tfoot>
		</table>
	)
}
