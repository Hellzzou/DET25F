/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { tableColor } from "../tools/colorManager"
import { allocRowSpan } from "../tools/spanManager"
import {
	allocSumOfAGroup,
	getUnderGroupList,
	monthReportByCel,
	monthReportByUnderGRoup,
	sameAllocSum,
} from "../tools/reportCalculator"
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
					{props.flights.map((month) => (
						<td key={props.flights.indexOf(month)}>
							{(month[group.underGroup].dayDuration + month[group.underGroup].nightDuration).toFixed(1)}
						</td>
					))}
					<td>{monthReportByUnderGRoup(props.flights, group.underGroup).toFixed(1)}</td>
					{group.allocation !== -1 && (
						<td rowSpan={allocRowSpan(props.groups!, props.groups.indexOf(group))}>
							{(
								group.allocation -
								sameAllocSum(
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
				{props.flights.map((month) => (
					<th key={props.flights.indexOf(month)}>
						{monthReportByCel(props.flights, props.groups!, props.flights.indexOf(month)).toFixed(1)}
					</th>
				))}
				<th>
					{sameAllocSum(
						props.flights,
						props.groups.map((group) => group.underGroup)
					).toFixed(1)}
				</th>
				<th>
					{(
						allocSumOfAGroup(props.groups) -
						sameAllocSum(
							props.flights,
							props.groups.map((group) => group.underGroup)
						)
					).toFixed(1)}
				</th>
			</tr>
		</>
	)
}
