import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { memberURL } from "../Datas/datas"
import { crewMemberHours } from "../tools/buildFlightHours"
import { getFetchRequest } from "../tools/fetch"
import { CrewMemberCardProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const CrewMemberCard = (props: CrewMemberCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	const [memberHours, setMemberHours] = useState<Record<string, number>>({})
	const history = useHistory()
	const detailClick = () => history.push(`/memberDetails/${props.crewMemberName}/${props.startDate}/${props.endDate}`)
	useAsyncEffect(async () => {
		const members = await getFetchRequest<crewMember[]>(memberURL)
		if (typeof members !== "string") {
			const member = members.find(({ trigram }) => trigram === props.crewMemberName)
			if (member) sertFullName(member)
		}
		const memberHours = crewMemberHours(props.crewMemberHours)
		setMemberHours(memberHours)
	}, [props.crewMemberHours])
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<h5 className='card-title text-center py-0'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</h5>
				<hr className='m-2'></hr>
				<div className='row'>
					<h6 className='card-subtitle mb-2 text-muted text-center'>Heures de vol</h6>
					<div className='row'>
						<div className='col-md-6 text-start'>Jour : </div>
						<div className={"col-md-6 text-end"}>
							{memberHours["day"] ? memberHours["day"].toFixed(1) : "0.0"}
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6 text-start'>Nuit : </div>
						<div className={"col-md-6 text-end"}>
							{memberHours["night"] ? memberHours["night"].toFixed(1) : "0.0"}
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6 text-start'>Total : </div>
						<div className={"col-md-6 text-end"}>
							{memberHours["total"] ? memberHours["total"].toFixed(1) : "0.0"}
						</div>
					</div>
				</div>
			</div>
			<Button size={12} buttonColor='primary' buttonContent='Détails' onClick={detailClick} />
		</div>
	)
}
