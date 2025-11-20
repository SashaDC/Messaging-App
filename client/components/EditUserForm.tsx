import { User } from '../../models/user'
import { useState } from 'react'

interface Props {
  currentUser: User
  handleUpdateUser: (updatedUser: User, fileData?: File) => void
}

interface FileSize {
  isTooBig: boolean
  size: number
}

export default function EditUserForm({ currentUser, handleUpdateUser }: Props) {
  const [formData, setFormData] = useState<User>({ ...currentUser })
  const [previewURL, setPreviewUrl] = useState<string | null>(
    currentUser.pfp ? currentUser.pfp : null,
  )
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [fileSize, setFileSize] = useState<FileSize | null>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      checkFileSize(e.target.files[0])
      setPreviewUrl(URL.createObjectURL(e.target.files[0]))
      setImageFile(e.target.files[0])
    } else {
      setImageFile(null)
      setPreviewUrl(currentUser.pfp ? currentUser.pfp : null)
    }
  }

  const checkFileSize = (file: File) => {
    console.log(file.size)
    if (file.size > 80000) {
      setFileSize({ isTooBig: true, size: file.size })
    }
    if (file.size <= 80000) {
      setFileSize({ isTooBig: false, size: file.size })
    }
  }

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className="flex min-h-screen flex-col items-center justify-center bg-[#240046]"
    >
      <div className="flex max-w-fit flex-col items-center border border-[#9D4EDD] bg-[#3C096C] px-10 py-4">
        {previewURL && (
          <img
            src={previewURL}
            alt="Preview your avatar"
            className="duration-400 relative z-10 h-40 w-40 transform rounded-full border-4 border-[#E0AAFF]/80 object-cover shadow-xl transition-all hover:scale-105"
          />
        )}
        <div className="m-4 text-center text-base text-white">
          <label htmlFor="pfp" className="text-lg">
            Upload profile image
          </label>
          <input
            type="file"
            name="pfp"
            id="pfp"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full pt-2"
          />
          {fileSize && fileSize.isTooBig && (
            <p className=" text-red-700">
              File is too large. <br /> Please choose an image under 80kb
            </p>
          )}
          {fileSize && !fileSize.isTooBig && (
            <p className="text-green-500">File size: {fileSize?.size}</p>
          )}
        </div>
        <div className="p-4">
          <label htmlFor="username" className="m-4 text-lg text-white">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            id="username"
            onChange={handleChange}
            className="w-full border-2 border-black p-2 text-base text-black"
            maxLength={255}
          />
        </div>

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
        <button
          type="submit"
          className="transform rounded-full bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] px-8 py-3 font-medium text-black shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
