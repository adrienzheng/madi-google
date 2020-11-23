import React from 'react'
import d3 from 'd3'

export default function GraphOne(props) {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    
  }, []);

  const handleClick = () => {
    setCount(count+1)
  }
  return (
    <div>
      <svg id="graphone"></svg>
    </div>
  )
}