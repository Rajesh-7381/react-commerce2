import React from 'react'

const BuggyComponent = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  if (shouldThrow) {
    throw new Error("This is a test error!");
  }
  return (
    <div>
    <div>
      <h2>Buggy Component</h2>
      <button onClick={() => setShouldThrow(true)}>Cause Error</button>
    </div>
    </div>
  )
}

export default BuggyComponent
