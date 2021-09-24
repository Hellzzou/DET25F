import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { TPALine } from "../BasicComponents/TPALine"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { memberURL } from "../Datas/urls"
import { buildDenaePurcentage } from "../tools/buildMemberActions"
import { getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { DenaeMiniCardProps } from "../types/Articles"
import { CrewMember } from "../types/Objects"

export const DenaeMiniCard = (props: DenaeMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [purcentage, setPurcentage] = useState({ value: "", color: "dark" })
	useAsyncEffect(async () => {
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		if (typeof members !== "string") {
			const member = members.find(({ trigram }) => trigram === props.denae.name)
			if (member) sertFullName(member)
		}
		const purcentage = buildDenaePurcentage(props.denae.TPA, props.date)
		setPurcentage({
			value: purcentage + " %",
			color: purcentage < 66 ? (purcentage < 50 ? "danger" : "warning") : "success",
		})
	}, [])
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
						<CrewTPACard member={props.denae} date={props.date} />
					</div>
					<div className='col-md-6'>
						<h6 className='card-subtitle mb-2 text-muted text-center'>TPA Individuel</h6>
						{props.denae.TPA.appRDR.map((appRDR) => (
							<TPALine
								key={props.denae.TPA.appRDR.indexOf(appRDR)}
								title='APP RDR:'
								color={getQuadri(appRDR, props.date)}
								value={appRDR.toLocaleDateString()}
							/>
						))}
						<TPALine
							title='P GPS:'
							color={getQuadri(props.denae.TPA.PGPS, props.date)}
							value={props.denae.TPA.PGPS.toLocaleDateString()}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
