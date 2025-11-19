import { User } from '../../models/user'
import { useState } from 'react'

interface Props {
  currentUser: User
  handleUpdateUser: (updatedUser: User) => void
}

export default function EditUserForm({ currentUser, handleUpdateUser }: Props) {
  const [formData, setFormData] = useState<User>({ ...currentUser })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleUpdateUser(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <form action="submit" onSubmit={handleSubmit}>
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
      {/* Todo - upload image  */}
      <label htmlFor="pfp">
        Biography:{' '}
        <input
          type="text"
          name="pfp"
          value={formData.pfp ? formData.pfp : ''}
          id="pfp"
          onChange={handleChange}
        />
      </label>
    </form>
  )
}
