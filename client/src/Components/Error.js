import React from 'react'
import {useRouteError} from 'react-router-dom'
const Error = () => {
    let rotingErr = useRouteError()
  return (
    <div>
      <div className="text-center">
        <h1>{rotingErr.status}-ErrorOccured</h1>
      </div>
    </div>
  )
}

export default Error
