import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { TPALine } from "../BasicComponents/TPALine"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { memberURL } from "../Datas/urls"
import { buildRadioPurcentage } from "../tools/buildMemberActions"
import { getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { RadioMiniCardProps } from "../types/Articles"
import { CrewMember } from "../types/Objects"

export const RadioMiniCard = (props: RadioMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [purcentage, setPurcentage] = useState({ value: "", color: "dark" })
	useAsyncEffect(async () => {
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		if (typeof members !== "string") {
			const member = members.find(({ trigram }) => trigram === props.radio.name)
			if (member) sertFullName(member)
		}
		const purcentage = buildRadioPurcentage(props.radio.TPA, props.date)
		setPurcentage({
			value: purcentage + " %",
			color: purcentage < 66 ? (purcentage < 50 ? "danger" : "warning") : "success",
		})
	}, [props.date])
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<div className='row my-0'>
					<h5 className='col-md-9 text-center py-0'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</h5>
					<h5 className={`col-md-3 text-${purcentage.color} text-center py-0`}>{`${purcentage.value}`}</h5>
				</div>
				<hr className='m-2'></hr>
				<div className='row'>
					<div className='col-md-6'>
						<CrewTPACard member={props.radio} date={props.date} />
					</div>
					<div className='col-md-6'>
						<h6 className='card-subtitle mb-2 text-muted text-center'>TPA Individuel</h6>
						<div className='row'>
							<div className='col-md-6 text-start'>IMINT:</div>
							<div
								className={`col-md-6 text-end text-${getQuadri(props.radio.TPA.IMINT[0], props.date)}`}>
								{props.radio.TPA.IMINT[0].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>IMINT:</div>
							<div
								className={`col-md-6 text-end text-${getQuadri(props.radio.TPA.IMINT[1], props.date)}`}>
								{props.radio.TPA.IMINT[1].toLocaleDateString()}
							</div>
						</div>
						{props.radio.TPA.entCodage.map((entCodage) => (
							<TPALine
								key={props.radio.TPA.entCodage.indexOf(entCodage)}
								title='Codage:'
								color={getQuadri(entCodage, props.date)}
								value={entCodage.toLocaleDateString()}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
