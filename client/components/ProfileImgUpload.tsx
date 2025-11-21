import { useState } from 'react'

interface Props {
  currentPfp: string
  updateImageFile: (file: File | null, imageIsOk: boolean) => void
}

export default function ProfileImgUpload({
  currentPfp,
  updateImageFile,
}: Props) {
  const [fileIsOversized, setFileOversized] = useState<boolean>(false)
  const [previewURL, setPreviewUrl] = useState<string>(currentPfp)

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the file is too big or if there is no file data found on event, reset default image values
    //Multer handles name for pfp so don't need to update state for formdata
    if (
      !e.target.files ||
      !e.target.files[0] ||
      e.target.files[0].size > 80000
    ) {
      setFileOversized(true)
      updateImageFile(null, false)
      setPreviewUrl(currentPfp)
    } else {
      // File exists and size ok - add new file values to state
      setPreviewUrl(URL.createObjectURL(e.target.files[0]))
      updateImageFile(e.target.files[0], true)
      setFileOversized(false)
    }
  }

  return (
    <>
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
    </>
  )
}
