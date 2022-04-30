import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as React from 'react';

function PartyDistPie(props){
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

    let colors = ['#0066ff', '#ff0000', '#ffffff'];
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
    return (
        <Pie
            data = {{
                labels: labels,
                datasets: [{
                    label: props.label,
                    data: data,
                }],
            }}
            options = {{
                maintainAspectRatio: false,
            }}
        />
    )
}

export default PartyDistPie;