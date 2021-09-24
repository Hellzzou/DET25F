import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { SimpleSelect } from "../BasicComponents/SimpleSelect"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { signupURL } from "../Datas/urls"
import { access, ranks } from "../Datas/constants"
import { postFetchRequest } from "../tools/fetch"
import { NewUserModalProps } from "../types/Articles"

export const NewUserModal = (props: NewUserModalProps): JSX.Element => {
	const [rank, setRank] = useState("")
	const [name, setName] = useState("")
	const [responsability, setResponsability] = useState("")
	const [email, setEmail] = useState("")
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
		prop: string
	) => {
		if (prop === "rank") setRank(e.target.value)
		if (prop === "name") setName(e.target.value)
		if (prop === "responsability") setResponsability(e.target.value)
		if (prop === "email") setEmail(e.target.value)
	}
	const handleClose = () => {
		setRank("")
		setName("")
		setResponsability("")
		setEmail("")
		props.onHide()
	}
	const createNewUser = async () => {
		const newUser = {
			rank,
			name,
			responsability,
			email,
			login: email,
			password: "Azerty01!",
		}
		const saved = await postFetchRequest(signupURL, newUser)
		if (saved === "Utilisateur crée") {
			props.setUsers([...props.users, newUser])
			setRank("")
			setName("")
			setResponsability("")
			setEmail("")
			handleClose()
			props.setAddUserShow(true)
		}
	}
	return (
		<Modal show={props.show} onHide={handleClose} backdrop='static' keyboard={false} size='lg'>
			<Modal.Header>
				<Modal.Title>Ajouter un nouvel utilisateur</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='row'>
					<Label size={4} title='Grade : ' />
					<SimpleSelect
						size={8}
						backgroundColor='dark'
						textColor='white'
						value={rank}
						handleChange={(event) => handleChange(event, "rank")}
						options={ranks}
					/>
				</div>
				<div className='row'>
					<Label size={4} title='Nom : ' />
					<UnvalidateInput
						size={8}
						backgroundColor='dark'
						textColor='white'
						type='text'
						control={{
							name: "name",
							value: name,
							validity: true,
						}}
						handleChange={(event) => handleChange(event, "name")}
					/>
				</div>
				<div className='row'>
					<Label size={4} title='Accès : ' />
					<SimpleSelect
						size={8}
						backgroundColor='dark'
						textColor='white'
						value={responsability}
						handleChange={(event) => handleChange(event, "responsability")}
						options={access}
					/>
				</div>
				<div className='row'>
					<Label size={4} title='email : ' />
					<UnvalidateInput
						size={8}
						backgroundColor='dark'
						textColor='white'
						type='text'
						control={{
							name: "email",
							value: email,
							validity: true,
						}}
						handleChange={(event) => handleChange(event, "email")}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size={5}
					buttonColor='primary'
					buttonContent='Enregistrer ce nouvel utilisateur'
					onClick={createNewUser}
				/>
				<Button size={2} buttonColor='danger' buttonContent='Annuler' onClick={handleClose} />
			</Modal.Footer>
		</Modal>
	)
}
