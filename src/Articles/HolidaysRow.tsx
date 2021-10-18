import React from "react"
import { useHistory } from "react-router-dom"
import { sortHolidaysByRow } from "../tools/buildWeekEvents"
import { getBetweenColSpanHoliday, getColSpanHoliday } from "../tools/spanManager"
import { HolidaysRowProps } from "../types/BasicComponents"

export const HolidaysRow = (props: HolidaysRowProps): JSX.Element => {
	const history = useHistory()
	return (
		<tbody>
			{!!props.holidays &&
				sortHolidaysByRow(props.holidays).map((holidayRow) => (
					<tr key={sortHolidaysByRow(props.holidays).indexOf(holidayRow)}>
						{holidayRow.map((holiday) => (
							<>
								<td colSpan={getBetweenColSpanHoliday(holiday, holidayRow)}></td>
								<td
									key={props.holidays.indexOf(holiday)}
									className='rounded bg-holiday align-middle container px-1 pointer'
									colSpan={getColSpanHoliday(holiday)}
									onClick={() => history.push(`/newPerm/${holiday._id}/${props.date}`)}>
									<div className='row justify-content-center'>
										{/^P/.test(holiday.type) ? "PERM : " : "RECUP : "}
										{holiday.members.reduce((acc, value) => (acc += value + " "), "")}
									</div>
								</td>
							</>
						))}
					</tr>
				))}
		</tbody>
	)
}
