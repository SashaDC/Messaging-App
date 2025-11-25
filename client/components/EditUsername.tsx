import { useEffect, useState } from 'react'
import { useCheckIfUsernameTaken } from '../hooks/useUsers'
import useDebounce from '../hooks/useDebounce'

interface Props {
  setUsernameForbidden: (usernameForbidden: boolean) => void
  setNewUsername: (newUsername: string) => void
  id: string
  currentUsername: string
}

export default function EditUsername({
  id,
  currentUsername,
  setUsernameForbidden,
  setNewUsername,
}: Props) {
  const [searchValue, setSearchValue] = useState(currentUsername)
  const debouncedSearchValue = useDebounce(searchValue)

  const {
    data: usernameForbidden,
    isLoading,
    isError,
  } = useCheckIfUsernameTaken(id, debouncedSearchValue)

  useEffect(() => {
    usernameForbidden !== undefined
      ? setUsernameForbidden(usernameForbidden)
      : setNewUsername(debouncedSearchValue)
  }, [usernameForbidden, debouncedSearchValue]) //eslint-disable-line

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  return (
    <div className="p-4">
      <label htmlFor="username" className="m-4 text-lg text-white">
        Username
      </label>
      <input
        type="text"
        name="username"
        value={searchValue}
        id="username"
        onChange={handleChange}
        className="w-full border-2 border-black p-2 text-base text-black"
        maxLength={255}
      />
      {/* Displays relating to verifying username */}
      {usernameForbidden && searchValue.trim().length !== 0 && (
        <p className=" mt-4 border border-[#9D4EDD] text-red-400">
          Username taken. <br /> Please choose another username.
        </p>
      )}
      {isLoading && (
        <p className=" mt-4 border border-[#9D4EDD] text-white">
          Verifying username...
        </p>
      )}
      {isError && (
        <p className=" mt-4 border border-[#9D4EDD] text-red-400">
          Unable to verify username
        </p>
      )}
      {searchValue.trim().length === 0 && (
        <p className=" mt-4 border border-[#9D4EDD] text-red-400">
          Please enter a username
        </p>
      )}
    </div>
  )
}
