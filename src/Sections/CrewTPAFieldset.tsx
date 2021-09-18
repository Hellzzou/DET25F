import React from "react"
import { CrewTPA } from "../Articles/CrewTPA"
import { MecboTPA } from "../Articles/MecboTPA"
import { NavTPA } from "../Articles/NavTPA"
import { PilotEQA } from "../Articles/PilotEQA"
import { PilotTPA } from "../Articles/pilotTPA"
import { RadioTPA } from "../Articles/RadioTPA"
import { Legend } from "../BasicComponents/Legend"
import { crewTPAFieldsetProps } from "../types/Sections"

export const CrewTPAFieldset = (props: crewTPAFieldsetProps): JSX.Element => {
	return (
		<>
			<fieldset className=' card-body-color rounded p-2 mb-1'>
				<Legend title='TPA Equipage' />
				<CrewTPA crewTPA={props.crewTPA} setCrewTPA={props.setCrewTPA} />
			</fieldset>
			<fieldset className=' card-body-color rounded p-2 mb-1'>
				<Legend title='TPA Individuels' />
				{props.pilotTPA.map((pilot) => (
					<PilotTPA
						key={props.pilotTPA.indexOf(pilot)}
						pilotTPA={pilot}
						pilotTPAs={props.pilotTPA}
						setPilotTPA={props.setPilotTPA}
					/>
				))}
				{props.mecboTPA.map((mecbo) => (
					<MecboTPA
						key={props.mecboTPA.indexOf(mecbo)}
						mecboTPA={mecbo}
						mecboTPAs={props.mecboTPA}
						setMecboTPA={props.setMecboTPA}
					/>
				))}
				{props.radioTPA.map((radio) => (
					<RadioTPA
						key={props.radioTPA.indexOf(radio)}
						radioTPA={radio}
						radioTPAs={props.radioTPA}
						setRadioTPa={props.setRadioTPa}
					/>
				))}
				{props.denaeTPA.map((denae) => (
					<NavTPA
						key={props.denaeTPA.indexOf(denae)}
						denaeTPA={denae}
						denaeTPAs={props.denaeTPA}
						setDenaeTPA={props.setDenaeTPA}
					/>
				))}
			</fieldset>
			<fieldset className=' card-body-color rounded p-2'>
				<Legend title='EQA Pilote' />
				{props.pilotEQA.map((pilot) => (
					<PilotEQA
						key={props.pilotEQA.indexOf(pilot)}
						pilotEQA={pilot}
						pilotEQAs={props.pilotEQA}
						setPilotEQA={props.setPilotEQA}
						dayDuration={props.dayDuration}
						setDayDuration={props.setDayDuration}
						nightDuration={props.nightDuration}
						setNightDuration={props.setNightDuration}
					/>
				))}
			</fieldset>
		</>
	)
}
