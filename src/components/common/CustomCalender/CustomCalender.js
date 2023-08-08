import React from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Typography } from '@mui/material'
import { FONT_WEIGHTS, FONT_WEIGHT_LABELS, CALENDAR_EVENT_OBJECTS, REMOVE_EVENT_OBJECTS } from '@/components/constants'
import { extractDate } from '@/utils/utils'
import CustomEvent from '@/components/common/CustomCalender/CustomEvent'

const localizer = dayjsLocalizer(dayjs)

const styles = {
  container: {
    height: '80vh',
    margin: '2em'
  }
}

const CustomCalender = ({ label, error, helperText, onChange, options, calendarDependentDate, ...props }) => {
  const date = calendarDependentDate || dayjs()?.$d

  const handelOnSelectEvent = (event, e) => {
    if (event?.title)
      if (onChange) {
        onChange(event, e)
      }
  }

  const modifiedEvents = options?.length ? [...options?.filter(item => item?.isShow)] : []

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: [
        CALENDAR_EVENT_OBJECTS.initial?.title,
        CALENDAR_EVENT_OBJECTS.holiday?.title,
        CALENDAR_EVENT_OBJECTS.holiday?.name,
        REMOVE_EVENT_OBJECTS?.title
      ]?.includes(event?.title)
        ? event?.color
        : 'rgba(255, 255, 255, 0.9)'
    }

    return {
      style
    }
  }

  return (
    <FormGroup>
      <Grid style={{ marginTop: '20px' }} container>
        <Grid item xs={5}>
          <FormLabel component='legend' sx={{ fontWeight: '600', color: '#09948e' }}>
            {label}
            {props?.isRequired && ' *'}
          </FormLabel>
          <FormLabel component='legend' sx={{ fontWeight: '300', color: '#09948e' }}>
            {props?.value}
          </FormLabel>
        </Grid>
        <Grid item>
          <Typography sx={{ textAlign: 'center', fontWeight: FONT_WEIGHTS[FONT_WEIGHT_LABELS.bold], color: '#09948e' }}>
            {extractDate({ date, isDay: false }) || ''}
          </Typography>
        </Grid>
        <Grid item xs={12} style={styles?.container}>
          <Calendar
            date={date}
            toolbar={false}
            localizer={localizer}
            eventPropGetter={eventStyleGetter}
            events={modifiedEvents}
            onSelectEvent={handelOnSelectEvent}
            startAccessor='start'
            endAccessor='end'
            components={{ event: CustomEvent }}
            style={{ fontSize: '10px' }}
          />
        </Grid>
      </Grid>
      {error && (
        <FormHelperText style={{ color: 'red' }} error>
          {error}
        </FormHelperText>
      )}
      {helperText && <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>}
    </FormGroup>
  )
}

export default CustomCalender
