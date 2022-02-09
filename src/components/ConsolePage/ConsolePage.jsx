import React from 'react'
// eslint-disable-next-line import/named
import { test } from '../../api/sendsay'

const ConsolePage = () => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div
    onClick={() => {
      test()
    }}
  >
    ConsolePage
  </div>
)

export default ConsolePage
