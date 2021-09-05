import React from "react"
import { CrewMemberCard } from "../Articles/CrewMemberCard"
import { CrewMembersCardsProps } from "../types/Sections"

export const CrewMembersCards = (props: CrewMembersCardsProps): JSX.Element => {
	return (
		<div className='row'>
			{props.crewMembersHours &&
				props.crewMembersHours.map((crewMember) => (
					<div className='col-md-3 my-2' key={props.crewMembersHours.indexOf(crewMember)}>
						<CrewMemberCard
							crewMemberName={crewMember.name}
							crewMemberHours={crewMember.flight}
							startDate={props.startDate}
							endDate={props.endDate}
						/>
					</div>
				))}
		</div>
	)
}
