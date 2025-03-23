import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const Bar=({title})=>{
  const currentRef=useRef(null)
  
  useEffect(()=>{
    // var chartDom = document.getElementById('main');
    var chartDom=currentRef.current
    var myChart = echarts.init(chartDom);
    var option;
  
    option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
  
    option && myChart.setOption(option);
  })
  return (
    <div>
      <div id='main' ref={currentRef} style={{width:"500px",height:"500px"}}></div>
    </div>
  )
}

export default Bar