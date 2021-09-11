import React, { useState } from "react"
import { Card } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { DB_URL } from "../Datas/datas"
import { crewMemberHours } from "../tools/buildFlightHours"
import { getFetchRequest } from "../tools/fetch"
import { CrewMemberCardProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const CrewMemberCard = (props: CrewMemberCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	const [memberHours, setMemberHours] = useState<Record<string, number>>({})
	const history = useHistory()
	const detailClick = () => {
		history.push(`/memberDetails/${props.crewMemberName}/${props.startDate}/${props.endDate}`)
	}
	useAsyncEffect(async () => {
		const members = await getFetchRequest(DB_URL + "crewMembers")
		sertFullName(members.find((member: crewMember) => member.trigram === props.crewMemberName))
		const memberHours = crewMemberHours(props.crewMemberHours)
		setMemberHours(memberHours)
	}, [props.crewMemberHours])
	return (
		<Card className='text-center'>
			<Card.Header className='p-1'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</Card.Header>
			<Card.Body className='p-2'>
				<div className='row'>
					<Card.Title>Heures de vol</Card.Title>
					<div className='row'>
						<div className='col-md-6 text-start'>Jour : </div>
						<div className={"col-md-6 text-end fw-bold"}>
							{memberHours["day"] ? memberHours["day"].toFixed(1) : "0.0"}
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6 text-start'>Nuit : </div>
						<div className={"col-md-6 text-end fw-bold"}>
							{memberHours["night"] ? memberHours["night"].toFixed(1) : "0.0"}
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6 text-start'>Total : </div>
						<div className={"col-md-6 text-end fw-bold"}>
							{memberHours["total"] ? memberHours["total"].toFixed(1) : "0.0"}
						</div>
					</div>
				</div>
			</Card.Body>
			<Card.Footer>
				<Button size={10} buttonColor='primary' buttonContent='Détails' onClick={detailClick} />
			</Card.Footer>
		</Card>
	)
}
