import React, { PureComponent } from 'react'
import {
  PieChart, Pie,Tooltip
} from 'recharts';

const data01 = [
    {
      "name": "<18",
      "value": 400
    },
    {
      "name": "18-25",
      "value": 300
    },
    {
      "name": "25-35",
      "value": 300
    },
    {
      "name": "35-55",
      "value": 200
    },
    {
      "name": "55-70",
      "value": 278
    },
    {
      "name": "70+",
      "value": 189
    }
  ];
  const data02 = [
    {
      "name": "<18",
      "value": 2400
    },
    {
      "name": "18-25",
      "value": 4567
    },
    {
      "name": "25-35",
      "value": 1398
    },
    {
      "name": "35-55",
      "value": 9800
    },
    {
      "name": "55-70",
      "value": 3908
    },
    {
      "name": "70+",
      "value": 4800
    }
  ];
    
class Graph extends PureComponent {
  render() {
    return (
                                 
        <PieChart width={370} height={300}>
            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            <Tooltip />
            {/* <Legend /> */}
        </PieChart>
    );
  }
}

export default Graph