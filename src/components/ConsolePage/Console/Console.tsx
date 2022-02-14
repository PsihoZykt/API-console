import React from 'react'
import './Console.css'
import Request from 'components/ConsolePage/Console/Request/Request'
import Response from 'components/ConsolePage/Console/Response/Response'

const Console = () => {
  return (
    <div className="console">
      <Request />
      <Response />
    </div>
  )
}
export default Console
