import { User } from '../../models/user'
import { useEffect, useState } from 'react'
import { useCheckIfUsernameTaken } from '../hooks/useUsers'

interface Props {
  currentUser: User
  handleUpdateUser: (updatedUser: User, fileData?: File) => Promise<void>
}

export default function EditUserForm({ currentUser, handleUpdateUser }: Props) {
  const [formData, setFormData] = useState<User>({ ...currentUser })
  // States below are to keep track of uploaded profile image information
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [fileIsOversized, setFileOversized] = useState<boolean>(false)
  const [previewURL, setPreviewUrl] = useState<string | null>(
    currentUser.pfp ? currentUser.pfp : '/img/profile/examplepfp.svg',
  )
  const {
    data: usernameForbidden,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useCheckIfUsernameTaken(currentUser.id, formData.username)

  useEffect(() => {
    const timer = setTimeout(async () => {
      refetch()
    }, 1000)
    return () => clearTimeout(timer)
  }, [formData.username, refetch])

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
    // Todo - check if username is taken periodically - debounce?
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the file is too big or if there is no file data found on event, reset default image values
    //Multer handles name for pfp so don't need to update state for formdata
    if (
      !e.target.files ||
      !e.target.files[0] ||
      e.target.files[0].size > 80000
    ) {
      setFileOversized(true)
      setImageFile(null)
      setPreviewUrl(currentUser.pfp ? currentUser.pfp : null)
    } else {
      // File exists and size ok - add new file values to state
      setPreviewUrl(URL.createObjectURL(e.target.files[0]))
      setImageFile(e.target.files[0])
      setFileOversized(false)
    }
  }

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className="flex min-h-screen flex-col items-center justify-center bg-[#240046]"
    >
      <div className="flex max-w-fit flex-col items-center border border-[#9D4EDD] bg-[#3C096C] px-10 py-4">
        {/* Preview of profile image */}
        {previewURL && (
          <img
            src={previewURL}
            alt="Preview your avatar"
            className="duration-400 relative z-10 h-40 w-40 transform rounded-full border-4 border-[#E0AAFF]/80 object-cover shadow-xl transition-all hover:scale-105"
          />
        )}
        {/* Change profile image */}
        <div className="m-4 text-center text-base text-white">
          <label htmlFor="pfp" className="text-lg">
            Upload profile image
          </label>
          <input
            type="file"
            name="pfp"
            id="pfp"
            accept=".svg, .png, .jpg, .jpeg, .webp"
            onChange={handleImageFileChange}
            className="block w-full pt-2"
          />
          {/* Warning message if image is too large */}
          {fileIsOversized && (
            <p className=" mt-4 border border-[#9D4EDD] text-red-400">
              File is too large. <br /> Please choose an image under 80kb
            </p>
          )}
        </div>
        {/* Change username */}
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
          {/* Displays relating to verifying username */}
          {usernameForbidden && formData.username !== '' && (
            <p className=" mt-4 border border-[#9D4EDD] text-red-400">
              Username taken. <br /> Please choose another username.
            </p>
          )}
          {isLoading ||
            (isFetching && (
              <p className=" mt-4 border border-[#9D4EDD] text-white">
                Verifying username...
              </p>
            ))}
          {isError && (
            <p className=" mt-4 border border-[#9D4EDD] text-red-400">
              Unable to verify username
            </p>
          )}
        </div>
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
        {/* Button is disabled if file size is too big */}
        {fileIsOversized && (
          <button
            disabled
            type="submit"
            className="cursor-not-allowed rounded-full bg-gradient-to-r from-[#9c8da8] to-[#82649b] px-8 py-3 font-medium text-black shadow-lg transition-all duration-300"
          >
            Submit
          </button>
        )}
        {/* Button renders if file size is ok */}
        {!fileIsOversized && (
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
