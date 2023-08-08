import React from 'react'
import { CALENDAR_EVENT_OBJECTS } from '@/components/constants'
import { s3BaseURL } from '@/utils/utils'
import Avatar from '@mui/material/Avatar'
import { capitalize } from 'lodash'

const CustomEvent = ({ event }) => {
  const eventStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  const isInitials =
    event.name === CALENDAR_EVENT_OBJECTS.initial?.name && event?.title !== CALENDAR_EVENT_OBJECTS.initial?.title

  return (
    <div style={eventStyle}>
      {isInitials ? (
        <Avatar sx={{ width: 24, height: 24 }} src={s3BaseURL(event.title)} alt='Event' />
      ) : (
        <strong>{capitalize(event.title)}</strong>
      )}
    </div>
  )
}

export default CustomEvent
