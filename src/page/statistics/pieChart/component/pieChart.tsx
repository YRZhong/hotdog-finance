import React from 'react'
import { ResponsivePie, PieDatum } from '@nivo/pie'
const PieChart: React.FC<{ data: PieDatum[] }> = ({ data }) => {
  return (
    <ResponsivePie
      margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
      data={data}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          itemsSpacing: 8,
          translateY: 80,
          itemWidth: 100,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 20,
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
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
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
          id: 'lines'
        },
        {
          match: {
            id: '支付宝'
          },
          id: 'lines'
        },
        {
          match: {
            id: '微信'
          },
          id: 'lines'
        }
      ]}
      sortByValue={true}
      enableRadialLabels={false}
      animate={true}
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
