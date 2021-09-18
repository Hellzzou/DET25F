import React from "react"
import { useHistory } from "react-router-dom"
import { DBInfos } from "../Datas/DbInfos"
import { DBCard } from "../Sections/DBCard"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"

export const ManageDB = (): JSX.Element => {
	const history = useHistory()
	const onAircraftClick = () => history.push("/aircrafts")
	const onFuelClick = () => history.push("/fuels")
	const onConfigClick = () => history.push("/configs")
	const onAreaClick = () => history.push("/areas")
	const onNCAreaClick = () => history.push("/NCAreas")
	const onGroupClick = () => history.push("/groups")
	const onTypeClick = () => history.push("/types")
	const onCrewMemberClick = () => history.push("/crewMembers")
	const onUserClick = () => history.push("/users")
	return (
		<div className='alegreya'>
			<Header />
			<Navbar />
			<div className='row m-2'>
				<div className='col-md-4'>
					<DBCard
						title='AVIONS'
						infos={DBInfos.aircraft.infos}
						warning={DBInfos.aircraft.warning}
						onClick={onAircraftClick}
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title='FUEL'
						infos={DBInfos.fuel.infos}
						warning={DBInfos.fuel.warning}
						onClick={onFuelClick}
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title='CONFIGS'
						infos={DBInfos.configs.infos}
						warning={DBInfos.configs.warning}
						onClick={onConfigClick}
					/>
				</div>
			</div>
			<div className='row m-2'>
				<div className='col-md-4'>
					<DBCard
						title='ZONES'
						infos={DBInfos.areas.infos}
						warning={DBInfos.areas.warning}
						onClick={onAreaClick}
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title='ZONES ZEENC'
						infos={DBInfos.NCAreas.infos}
						warning={DBInfos.NCAreas.warning}
						onClick={onNCAreaClick}
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title='GROUPES'
						infos={DBInfos.groups.infos}
						warning={DBInfos.groups.warning}
						onClick={onGroupClick}
					/>
				</div>
			</div>
			<div className='row m-2'>
				<div className='col-md-4'>
					<DBCard
						title='TYPES DE VOL'
						infos={DBInfos.types.infos}
						warning={DBInfos.types.warning}
						onClick={onTypeClick}
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title="MEMBRES D'EQUIPAGE"
						infos={DBInfos.crewMembers.infos}
						warning={DBInfos.crewMembers.warning}
						onClick={onCrewMemberClick}
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title='UTILISATEURS'
						infos={DBInfos.users.infos}
						warning={DBInfos.users.warning}
						onClick={onUserClick}
					/>
				</div>
			</div>
		</div>
	)
}
