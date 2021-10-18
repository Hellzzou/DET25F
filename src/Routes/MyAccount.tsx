import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { PasswordChangeModal } from "../Articles/PasswordChangeModal"
import { AlertToast } from "../BasicComponents/AlertToast"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { SimpleSelect } from "../BasicComponents/SimpleSelect"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { INITIAL_USER } from "../Datas/initialObjects"
import { getOneUserURL, userURL } from "../Datas/urls"
import { ranks } from "../Datas/constants"
import { MainNavBar } from "../Sections/MainNavbar"
import { getFetchRequest, putFetchRequest } from "../tools/fetch"
import { User } from "../types/Objects"

export const MyAccount = (): JSX.Element => {
	const [user, setUser] = useState<User>(INITIAL_USER)
	const [modifyUserShow, setModifyUserShow] = useState(false)
	const [modalShow, setModalShow] = useState(false)
	const [passwordChangeShow, setPasswordChangeShow] = useState(false)
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
		prop: string
	) => {
		setUser({
			_id: user._id,
			rank: prop === "rank" ? e.target.value : user.rank,
			firstName: prop === "firstName" ? e.target.value : user.firstName,
			surName: prop === "surName" ? e.target.value : user.surName,
			trigram: prop === "trigram" ? e.target.value : user.trigram,
			email: prop === "email" ? e.target.value : user.email,
			login: prop === "login" ? e.target.value : user.login,
			responsability: user.responsability,
			password: user.password,
		})
	}
	const modifyUser = async () => {
		const modified = await putFetchRequest(userURL, user)
		if (modified === "success") setModifyUserShow(true)
	}
	useAsyncEffect(async () => {
		const user = await getFetchRequest<User>(getOneUserURL)
		setUser(user)
	}, [])
	return (
		<div className='alegreya'>
			<MainNavBar />
			<AlertToast
				color='primary'
				info='Vos informations ont bien été modifiée'
				show={modifyUserShow}
				onClose={() => setModifyUserShow(false)}
			/>
			<AlertToast
				color='primary'
				info='Votre mot de passe a bien été modifié'
				show={passwordChangeShow}
				onClose={() => setPasswordChangeShow(false)}
			/>
			<PasswordChangeModal
				show={modalShow}
				setShow={setModalShow}
				onHide={() => setModalShow(false)}
				onShow={() => setModalShow(true)}
				setAddUserShow={setPasswordChangeShow}
			/>
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div>
						- En cliquant sur &apos;Modifier mes informations&apos; vous modifierez toutes vos informations
						execpté le mot de passe.
					</div>
					<div>
						- Pour changer de mot de passe, il faut que toutes vos informations précédentes soient remplies,
						et cliquer sur &apos;Changer mon mot de passe&apos;.
					</div>
				</div>
			</div>
			<div className='container col-md-6 card-body-color rounded justify-content-center p-2'>
				<div className='text-center'>
					<h4>Informations relatives à mon compte</h4>
				</div>
				<div className='row justify-content-center m-2'>
					<Label title='Votre grade : ' size={3} />
					<SimpleSelect
						size={8}
						backgroundColor='dark'
						textColor='white'
						value={user.rank}
						options={ranks}
						handleChange={(e) => handleChange(e, "rank")}
					/>
				</div>
				<div className='row justify-content-center m-2'>
					<Label title='Votre prénom : ' size={3} />
					<UnvalidateInput
						size={8}
						backgroundColor='dark'
						textColor='white'
						type='text'
						control={{
							name: "firstName",
							value: user.firstName,
							validity: true,
						}}
						handleChange={(e) => handleChange(e, "firstName")}
					/>
				</div>
				<div className='row justify-content-center m-2'>
					<Label title='Votre nom : ' size={3} />
					<UnvalidateInput
						size={8}
						backgroundColor='dark'
						textColor='white'
						type='text'
						control={{
							name: "surName",
							value: user.surName,
							validity: true,
						}}
						handleChange={(e) => handleChange(e, "surName")}
					/>
				</div>
				<div className='row justify-content-center m-2'>
					<Label title='Votre trigramme : ' size={3} />
					<UnvalidateInput
						size={8}
						backgroundColor='dark'
						textColor='white'
						type='text'
						control={{
							name: "trigram",
							value: user.trigram,
							validity: true,
						}}
						handleChange={(e) => handleChange(e, "trigram")}
					/>
				</div>
				<div className='row justify-content-center m-2'>
					<Label title='Votre email : ' size={3} />
					<UnvalidateInput
						size={8}
						backgroundColor='dark'
						textColor='white'
						type='text'
						control={{
							name: "email",
							value: user.email,
							validity: true,
						}}
						handleChange={(e) => handleChange(e, "email")}
					/>
				</div>
				<div className='row justify-content-center m-2'>
					<Label title='Votre login : ' size={3} />
					<UnvalidateInput
						size={8}
						backgroundColor='dark'
						textColor='white'
						type='text'
						control={{
							name: "login",
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							value: user.login!,
							validity: true,
						}}
						handleChange={(e) => handleChange(e, "login")}
					/>
				</div>
			</div>
			<div className='row justify-content-center mt-2'>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Modifier mes informations'
					onClick={modifyUser}
					disabled={
						user.rank == "" ||
						user.firstName === "" ||
						user.surName === "" ||
						user.trigram === "" ||
						user.email === "" ||
						user.login === ""
					}
				/>
				<div className='col-md-1'></div>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Changer mon mot de passe'
					onClick={() => setModalShow(true)}
					disabled={
						user.rank == "" ||
						user.firstName === "" ||
						user.surName === "" ||
						user.trigram === "" ||
						user.email === "" ||
						user.login === ""
					}
				/>
			</div>
		</div>
	)
}
