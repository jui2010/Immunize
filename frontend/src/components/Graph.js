import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: '4-Aug', supply: 4000, demand: 2400, amt: 2400,
  },
  {
    name: '5-Aug', supply: 3000, demand: 1398, amt: 2210,
  },
  {
    name: '6-Aug', supply: 2000, demand: 7900, amt: 5590,
  },
  {
    name: '7-Aug', supply: 2780, demand: 3908, amt: 2000,
  },
  {
    name: '8-Aug', supply: 1890, demand: 4800, amt: 2181,
  },
  {
    name: '9-Aug', supply: 2390, demand: 3800, amt: 2500,
  },
  {
    name: '10-Aug', supply: 3490, demand: 4300, amt: 2100,
  },
];

class Graph extends PureComponent {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="demand" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="supply" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

export default Graph