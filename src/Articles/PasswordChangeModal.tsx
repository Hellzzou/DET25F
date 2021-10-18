import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import {
	INITIAL_BAD_PASSWORD,
	INITIAL_CORRECT_PASSWORD,
	INITIAL_NOT_SAME_PASSWORD,
	INITIAL_USER,
} from "../Datas/initialObjects"
import { checkPassword, getOneUserURL, signupURL, userDeleteURL } from "../Datas/urls"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialObjects"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { passwordCheck } from "../tools/validators"
import { PasswordChangeModalProps } from "../types/Articles"
import { User } from "../types/Objects"
import { PasswordInput } from "../BasicComponents/PasswordInput"
import { Label } from "../BasicComponents/Label"

export const PasswordChangeModal = (props: PasswordChangeModalProps): JSX.Element => {
	const [ancientPassword, setAncientPassword] = useState(INITIAL_FALSE_CONTROL)
	const [newPassword1, setNewPassword1] = useState(INITIAL_FALSE_CONTROL)
	const [info, setInfo] = useState(INITIAL_BAD_PASSWORD)
	const [newPassword2, setNewPassword2] = useState(INITIAL_FALSE_CONTROL)
	const [user, setUser] = useState<User>(INITIAL_USER)
	const handleClose = () => {
		setAncientPassword(INITIAL_FALSE_CONTROL)
		setNewPassword1(INITIAL_FALSE_CONTROL)
		setNewPassword2(INITIAL_FALSE_CONTROL)
		setInfo(INITIAL_BAD_PASSWORD)
		props.onHide()
	}
	const checkAncientPasswordValidity = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setAncientPassword({ value: e.target.value, validity: ancientPassword.validity, disabled: false })
		const check = await postFetchRequest(checkPassword, { login: user.login, password: e.target.value })
		if (check === "correct")
			setAncientPassword({ value: e.target.value, validity: check === "correct", disabled: false })
	}
	const checkPAssword = (e: React.ChangeEvent<HTMLInputElement>, number: 1 | 2) => {
		let validity = passwordCheck(e.target.value)
		if (validity) {
			setInfo(INITIAL_NOT_SAME_PASSWORD)
			validity = validity && e.target.value === (number === 1 ? newPassword2.value : newPassword1.value)
			if (validity) setInfo(INITIAL_CORRECT_PASSWORD)
		}
		setNewPassword1({ value: number === 1 ? e.target.value : newPassword1.value, validity, disabled: false })
		setNewPassword2({ value: number === 1 ? newPassword2.value : e.target.value, validity, disabled: false })
	}
	const createNewUser = async () => {
		const deleted = await deleteFetchRequest(userDeleteURL, { name: user.firstName })
		if (deleted === "success") {
			const newUser = {
				rank: user.rank,
				firstName: user.firstName,
				surName: user.surName,
				trigram: user.trigram,
				responsability: user.responsability,
				email: user.email,
				login: user.login,
				password: newPassword1.value,
			}
			const saved = await postFetchRequest(signupURL, newUser)
			if (saved === "Utilisateur crée") {
				handleClose()
				props.setAddUserShow(true)
			}
		}
	}
	useAsyncEffect(async () => {
		const user = await getFetchRequest<User>(getOneUserURL)
		setUser(user)
	}, [])
	return (
		<Modal show={props.show} onHide={handleClose} backdrop='static' keyboard={false} size='lg'>
			<Modal.Header>
				<Modal.Title>Changer mon mot de passe</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='row my-2'>
					<Label title='Ancien mot de passe :' size={4} />
					<PasswordInput
						type='password'
						password={ancientPassword}
						info={{
							color: "",
							value: "",
						}}
						handleChange={(e) => checkAncientPasswordValidity(e)}
					/>
				</div>
				<div className='row my-2'>
					<Label title='Nouveau mot de passe :' size={4} />
					<PasswordInput
						type='password'
						password={newPassword1}
						info={info}
						handleChange={(e) => checkPAssword(e, 1)}
					/>
				</div>
				<div className='row my-2'>
					<Label title='Confirmer le mot de passe :' size={4} />
					<PasswordInput
						type='password'
						password={newPassword2}
						info={info}
						handleChange={(e) => checkPAssword(e, 2)}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size={5}
					buttonColor='primary'
					buttonContent='Changer mon mot de passe'
					onClick={createNewUser}
					disabled={!(newPassword1.validity && newPassword2.validity && ancientPassword.validity)}
				/>
				<Button size={2} buttonColor='danger' buttonContent='Annuler' onClick={handleClose} />
			</Modal.Footer>
		</Modal>
	)
}
