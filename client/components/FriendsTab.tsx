import React, { useState } from 'react'
import FriendsTabContent from './FriendsTabContent'
import { Status } from '../../models/friend'
import { useFetchAllFriends } from '../hooks/useFriends'
import { useOutletContext } from 'react-router'
import { ChatOutletContext } from '../../models/outletContext'

interface Props {
  setAlertMsg: (errorMsg: string | null) => void
}

//This function fetches all friends data. If data successfully loads,
// the tabs display friends according to friend status
export default function FriendsTabs({ setAlertMsg }: Props) {
  const { currentUserId } = useOutletContext<ChatOutletContext>()
  const { data, isLoading, isError } = useFetchAllFriends(currentUserId)
  const [tab, setTab] = useState<Status>('accepted')

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonClicked = e.currentTarget.name as Status
    setTab(buttonClicked)
    setAlertMsg(null)
  }

  const htmlButtonData = [
    { id: 'accepted-tab', name: 'accepted', text: 'Existing' },
    // { id: 'pending-tab', name: 'pending', text: 'Requested' },
    { id: 'blocked-tab', name: 'blocked', text: 'Blocked' },
  ]

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 border-b border-[#E0AAFF] dark:border-gray-700">
        <ul
          className="-mb-px flex flex-wrap text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          {htmlButtonData.map((data) => (
            <li key={data.id} className="mr-2 flex-1" role="presentation">
              <button
                onClick={handleTabClick}
                className={`inline-block rounded-t-lg border-b-2 border-transparent px-4 py-4 text-center 
                  text-sm font-medium ${tab === data.name ? 'text-[#E0AAFF]' : 'text-[#9D4EDD]'} 
                  hover:border-gray-300 hover:text-[#E0AAFF]`}
                id={data.id}
                type="button"
                role="tab"
                name={data.name}
              >
                {data.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id="tabContent">
        {isLoading && <p>Loading friends...</p>}
        {isError || (!data && <p>Error loading friends. Try again later</p>)}
        {data && (
          <FriendsTabContent
            status={tab}
            friends={data}
            setAlertMsg={setAlertMsg}
          />
        )}
      </div>
    </div>
  )
}
