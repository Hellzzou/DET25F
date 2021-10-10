import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { HolidayHistoryDetailsProps } from "../types/Articles"
import { PermHistoryRemainder } from "../types/Objects"

export const HolidayHistoryDetails = (props: HolidayHistoryDetailsProps): JSX.Element => {
	const [holidays, setHolidays] = useState<PermHistoryRemainder[]>([])
	useAsyncEffect(async () => {
		let remainder = 0
		setHolidays(
			props.holidayHistory
				.sort((h1, h2) => new Date(h1.date).getTime() - new Date(h2.date).getTime())
				.map((holiday) => {
					remainder += holiday.number
					return {
						date: holiday.date,
						credit: holiday.credit,
						number: holiday.number,
						reason: holiday.reason,
						remainder: remainder,
					}
				})
		)
	}, [])
	return (
		<div className='row justify-content-center'>
			<div className='col-md-8'>
				<table className='table table-sm table-secondary table-striped text-center mt-2'>
					<colgroup>
						<col width='20%'></col>
						<col width='20%'></col>
						<col width='20%'></col>
						<col width='20%'></col>
						<col width='20%'></col>
					</colgroup>
					<thead>
						<tr>
							<th>Date</th>
							<th>Crédit/Débit</th>
							<th>Nombre</th>
							<th>Raison</th>
							<th>Reliquat</th>
						</tr>
					</thead>
					<tbody>
						{holidays.length > 0 &&
							holidays.map((holiday) => (
								<tr key={holidays.indexOf(holiday)}>
									<td>{new Date(holiday.date).toLocaleDateString()}</td>
									<td>{holiday.credit}</td>
									<td>{holiday.number}</td>
									<td>{holiday.reason}</td>
									<td>{holiday.remainder}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
