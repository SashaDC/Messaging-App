import { User } from '../../models/user'
import { useState } from 'react'

interface Props {
  currentUser: User
  handleUpdateUser: (updatedUser: User, fileData?: File) => void
}

interface FileSize {
  isTooBig: boolean
  size: string
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setFileSize({ isTooBig: true, size: `${file.size / 1000}kb` })
    }
    if (file.size <= 80000) {
      setFileSize({ isTooBig: false, size: `${file.size / 1000}kb` })
    }
  }

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-[#10002B]"
    >
      <div className=" flex max-w-fit flex-col items-center border border-white bg-[#3C096C]  shadow-2xl shadow-white">
        {previewURL && (
          <img
            src={previewURL}
            alt="Preview your avatar"
            className="m-4 max-h-52 max-w-52 rounded-full border-8 border-white"
          />
        )}
        <div>
          <label htmlFor="pfp" className="m-4 bg-white">
            Upload profile image:{' '}
            <input
              type="file"
              name="pfp"
              id="pfp"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {fileSize && fileSize.isTooBig && (
            <p>File is too large. Please choose an image under 80kb</p>
          )}
          {fileSize && !fileSize.isTooBig && <p>File size: {fileSize?.size}</p>}
        </div>

        <div>
          <label htmlFor="bio">
            Biography:{' '}
            <input
              type="text"
              name="bio"
              value={formData.bio ? formData.bio : ''}
              id="bio"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:{' '}
            <input
              type="text"
              name="username"
              value={formData.username}
              id="username"
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
