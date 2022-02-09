import React from 'react'
import { test } from 'api/sendsay'

const ConsolePage = () => (
  <div
    onClick={() => {
      test()
    }}
  >
    ConsolePage
  </div>
)

export default ConsolePage
