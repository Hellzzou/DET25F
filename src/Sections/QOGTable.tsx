/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { QOGRow } from "../Articles/QOGRow"
import { DB_URL } from "../Datas/datas"
import { englishMonths } from "../Datas/dates"
import { INITIAL_GROUP } from "../Datas/group"
import { getFetchRequest } from "../tools/fetch"
import {
	allocSumOfAGroup,
	groupFilter,
	sumQOGFlights,
	sumQOGFlightsByMontAndGroup,
	sumQOGFlightsByMontAndGroupNight,
	sumQOGFlightsNight,
} from "../tools/table"
import { QOGTableProps } from "../types/Sections"

export const QOGTable = (props: QOGTableProps): JSX.Element => {
	const [allGroups, setAllGroups] = useState([INITIAL_GROUP])
	const [allDistinctGroups, setAllDistinctGroups] = useState([])
	useAsyncEffect(async () => {
		const allGroups = await getFetchRequest(DB_URL + "groups")
		setAllGroups(allGroups)
		const allDistinctGroups = await getFetchRequest(DB_URL + "groups/distinct")
		setAllDistinctGroups(allDistinctGroups)
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
					{englishMonths.map((month) => (
						<th key={englishMonths.indexOf(month)}>
							{sumQOGFlightsByMontAndGroup(props.flights, allGroups, month).toFixed(1)}
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
					{englishMonths.map((month) => (
						<th key={englishMonths.indexOf(month)}>
							{sumQOGFlightsByMontAndGroupNight(props.flights, allGroups, month).toFixed(1)}
						</th>
					))}
					<th>{sumQOGFlightsNight(props.flights, allGroups).toFixed(1)}</th>
					<th></th>
				</tr>
			</tfoot>
		</table>
	)
}
