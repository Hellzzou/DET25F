import React, { useState } from "react"
import { Card } from "react-bootstrap"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { DB_URL } from "../Datas/datas"
import { getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { RadioMiniCardProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const RadioMiniCard = (props: RadioMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	useAsyncEffect(async () => {
		const members = await getFetchRequest<crewMember[]>(DB_URL + "crewMembers")
		if (typeof members !== "string") {
			const member = members.find((member: crewMember) => member.trigram === props.radio.name)
			if (member) sertFullName(member)
		}
	}, [])
	return (
		<Card className='text-center'>
			<Card.Header className='p-1'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</Card.Header>
			<Card.Body className='p-2'>
				<div className='row'>
					<div className='col-md-6'>
						<CrewTPACard member={props.radio} date={props.date} />
					</div>
					<div className='col-md-6'>
						<Card.Title>TPA Individuel</Card.Title>
						<div className='row'>
							<div className='col-md-6 text-start'>IMINT: </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getQuadri(
									props.radio.TPA.IMINT[0],
									props.date
								)}`}>
								{props.radio.TPA.IMINT[0].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>IMINT : </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getQuadri(
									props.radio.TPA.IMINT[1],
									props.date
								)}`}>
								{props.radio.TPA.IMINT[1].toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}
