import React from 'react'
import { ResponsiveBar, BarDatum } from '@nivo/bar'
import { Catalog } from '@/utils/catalog'

const BarChart: React.FC<{ data: BarDatum[] }> = ({ data }) => {
  const keys: string[] = Catalog.map((item) => item.label)
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="time"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          color: 'rgba(255, 255, 255, 0.3)',
          background: 'inherit',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          color: 'rgba(255, 255, 255, 0.3)',
          background: 'inherit',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: '房租'
          },
          id: 'lines'
        },
        {
          match: {
            id: '房贷'
          },
          id: 'dots'
        }
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  )
}

export default BarChart
