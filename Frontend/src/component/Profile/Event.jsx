import React from 'react'
import EventCard from './EventCard'

const Event = () => {
  return (
    <div className='mt-5 px-5 py-5 flex flex-wrap gap-5'>

      {
        [1, 2, 3, 4, 5, 6, 7, 8, , 9].map(item =>
          <EventCard key={item} />
        )
      }
    </div>
  )
}

export default Event