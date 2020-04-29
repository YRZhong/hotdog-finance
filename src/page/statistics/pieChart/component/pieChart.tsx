import React from 'react'
import { ResponsivePie, PieDatum } from '@nivo/pie'
const PieChart: React.FC<{ data: PieDatum[] }> = ({ data }) => {
  return (
    <ResponsivePie
      margin={{ top: 40, right: 40, bottom: 40, left: 20 }}
      data={data}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          itemsSpacing: 10,
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
      sortByValue={true}
      enableRadialLabels={false}
      enableSlicesLabels={false}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsLinkStrokeWidth={2}
      radialLabelsSkipAngle={0}
      onClick={(e) => console.log(e)}
    />
  )
}

export default PieChart
