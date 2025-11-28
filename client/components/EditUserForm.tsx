import { User } from '../../models/user'
import { useState } from 'react'
import ProfileImgUpload from './ProfileImgUpload'
import EditUsername from './EditUsername'

interface Props {
  currentUser: User
  handleUpdateUser: (updatedUser: User, fileData?: File) => Promise<void>
}

export default function EditUserForm({ currentUser, handleUpdateUser }: Props) {
  const [formData, setFormData] = useState<User>({ ...currentUser })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [fileSizeOk, setFileSizeOk] = useState<boolean>(true)
  const [usernameForbidden, setUsernameForbidden] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    imageFile
      ? handleUpdateUser(formData, imageFile)
      : handleUpdateUser(formData)
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const updateImageFile = (imgFile: File | null, imageIsOk: boolean) => {
    setImageFile(imgFile)
    setFileSizeOk(imageIsOk)
  }

  const updateUsername = (newUsername: string) => {
    setFormData({ ...formData, username: newUsername })
  }

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className="flex min-h-screen flex-col items-center justify-center bg-[#240046] lg:p-4"
    >
      <div className="flex max-w-fit flex-col items-center border-[#9D4EDD] bg-[#3C096C] px-10 py-4 sm:border-t md:border">
        {/* Change profile image */}
        <ProfileImgUpload
          updateImageFile={updateImageFile}
          currentPfp={
            currentUser.pfp ? currentUser.pfp : '/img/profile/examplepfp.svg'
          }
        />
        {/* Change username */}
        <EditUsername
          id={currentUser.id}
          currentUsername={currentUser.username}
          setUsernameForbidden={setUsernameForbidden}
          setNewUsername={updateUsername}
        />
        {/* Change biography */}
        <div className="p-4">
          <label htmlFor="bio" className="m-4 text-lg text-white">
            Biography
          </label>
          <textarea
            name="bio"
            value={formData.bio ? formData.bio : ''}
            id="bio"
            onChange={handleChange}
            className="h-44 w-full whitespace-normal text-wrap p-4 text-start text-base text-black"
            maxLength={255}
          />
        </div>
        {/* Button is disabled if file size is too big or username invalid*/}
        {(!fileSizeOk || usernameForbidden) && (
          <button
            disabled
            type="submit"
            className="cursor-not-allowed rounded-full bg-gradient-to-r from-[#9c8da8] to-[#82649b] px-8 py-3 font-medium text-black shadow-lg transition-all duration-300"
          >
            Submit
          </button>
        )}
        {/* Button renders if file size is ok and username valid */}
        {fileSizeOk && !usernameForbidden && (
          <button
            type="submit"
            className="transform rounded-full bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] px-8 py-3 font-medium text-black shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  )
}
