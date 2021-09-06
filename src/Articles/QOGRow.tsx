/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { englishMonths } from "../Datas/dates"
import {
	allocRowSpan,
	allocSumOfAGroup,
	getUnderGroupList,
	sumFlights,
	sumQOGFlightsByMontAndGroup,
	sumQOGFlightsByUnderGroup,
	sumUnderGroupList,
	tableColor,
} from "../tools/table"
import { QOGRowProps } from "../types/Articles"

export const QOGRow = (props: QOGRowProps): JSX.Element => {
	return (
		<>
			{props.groups.map((group) => (
				<tr className={`table-${tableColor(props.groupName)}`} key={props.groups.indexOf(group)}>
					{props.groups.indexOf(group) === 0 && <td rowSpan={props.groups.length}>{group.group}</td>}
					<td>{group.underGroup}</td>
					<td>{group.description}</td>
					<td>{group.manager}</td>
					<td>{group.client}</td>
					{group.allocation !== -1 && (
						<td rowSpan={allocRowSpan(props.groups!, props.groups.indexOf(group))}>
							{group.allocation.toFixed(1)}
						</td>
					)}
					{englishMonths.map((month) => (
						<td key={englishMonths.indexOf(month)}>
							{sumFlights(props.flights[month][group.underGroup]).toFixed(1)}
						</td>
					))}
					<td>{sumQOGFlightsByUnderGroup(props.flights, group.underGroup).toFixed(1)}</td>
					{group.allocation !== -1 && (
						<td rowSpan={allocRowSpan(props.groups!, props.groups.indexOf(group))}>
							{(
								group.allocation -
								sumUnderGroupList(
									props.flights,
									getUnderGroupList(props.groups!, props.groups.indexOf(group))
								)
							).toFixed(1)}
						</td>
					)}
				</tr>
			))}
			<tr className={`table-${tableColor(props.groupName)}`}>
				<th className='text-end' colSpan={5}>
					Total Groupe {props.groupName}
				</th>
				<th>{allocSumOfAGroup(props.groups).toFixed(1)}</th>
				{englishMonths.map((month) => (
					<th key={englishMonths.indexOf(month)}>
						{sumQOGFlightsByMontAndGroup(props.flights, props.groups!, month).toFixed(1)}
					</th>
				))}
				<th>
					{sumUnderGroupList(
						props.flights,
						props.groups.map((group) => group.underGroup)
					).toFixed(1)}
				</th>
				<th>
					{(
						allocSumOfAGroup(props.groups) -
						sumUnderGroupList(
							props.flights,
							props.groups.map((group) => group.underGroup)
						)
					).toFixed(1)}
				</th>
			</tr>
		</>
	)
}
