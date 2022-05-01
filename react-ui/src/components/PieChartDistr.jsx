import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as rca from "rainbow-colors-array";
import * as React from 'react';

export function PartyDistPie(props){
    ChartJS.register(ArcElement, Tooltip, Legend);

    // Get the number of each party
    let labels = ['Democrat', 'Republican', 'Independent'];
    let counts = new Map();
    labels.forEach(label => counts.set(label, 0));
    props.data.forEach( (congressman) => {
        let party = congressman['party'];
        if (party === 'D') {
            counts.set('Democrat', counts.get('Democrat') + 1);
        } else if (party === 'R') {
            counts.set('Republican', counts.get('Republican') + 1);
        } else {
            counts.set('Independent', counts.get('Independent') + 1);
        }
    });

    let colors = ['#0066ff', '#ff0000', '#ff0fff'];
    let chartData = {
        labels: labels,
        datasets: [{
            label: props.label,
            data: Array.from(counts.values()),
            backgroundColor: colors,
            borderColor: colors,
        }],
    }

    return (
        <Pie
            data = {chartData}
        />
    )
}

export function BillPolicyDistPie(props) {
    // Count the number of each policy area
    let bills = props.bills;
    let counts = new Map();
    bills.forEach( bill => {
            if (counts.has(bill['policyArea'])) {
                counts.set(bill['policyArea'], counts.get(bill['policyArea']) + 1);
            } else {
                counts.set(bill['policyArea'], 1);
            }
        }
    )

    let labels = Array.from(counts.keys());
    let data = Array.from(counts.values());
    let colors = rca(data.length, "hex", false)
        .map(color => '#' + color['hex'])
        .sort(() =>  0.5 - Math.random()); // Shuffle the colors up so it doesnt look like a gradient
    console.log(colors)
    return (
        <Pie
            data = {{
                labels: labels,
                datasets: [{
                    label: props.label,
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors,
                }],
                }
            }
        />
    )
}
