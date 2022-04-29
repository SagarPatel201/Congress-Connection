import { PieChart } from 'react-minimal-pie-chart';
import * as React from 'react';

const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

function PieChartDist(props){
    let numDemocrats = 0
    let numRepublicans = 0
    let others = 0
    for (let i = 0; i < props.data.length; i++){
        let politician = props.data[i]
        if(politician['party'] == 'D'){
            numDemocrats+=1;
        }else if(politician['party'] == 'R'){
            console.log(politician['party'])
            numRepublicans +=1;
        }else{
            console.log(politician['party'])
            others += 1
        }
    }
    return(
            <PieChart
                style={{ height: '500px' }}
                label={(props) => { return props.dataEntry.title 
                    + " " + Math.round(props.dataEntry.percentage * 100)/100
                    + "%"
                }}

                data={[
                    { title: 'Democratic Party', value: numDemocrats, color: '#89CFF0' },
                    { title: 'Republican Party', value: numRepublicans, color: '#C13C37' },
                    { title: 'Independent Party', value: others, color: '#5D3FD3' },
                ]}
                
                labelStyle={{
                    ...defaultLabelStyle,
                  }}
            />
    )
}

export default PieChartDist;