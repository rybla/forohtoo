"use client";

import { useState } from 'react';
import { HistoryItem } from '@/actions';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format, startOfDay, startOfWeek, startOfMonth, startOfYear } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Grouping = 'day' | 'week' | 'month' | 'year';

interface TransactionGraphProps {
    history: HistoryItem[];
}

export default function TransactionGraph({ history }: TransactionGraphProps) {
    const [grouping, setGrouping] = useState<Grouping>('day');

    const getGroupedData = () => {
        const grouped: { [key: string]: number } = {};

        history.forEach(item => {
            const date = new Date(item.model.content.block_timestamp);
            let key: string;

            switch (grouping) {
                case 'day':
                    key = format(startOfDay(date), 'yyyy-MM-dd');
                    break;
                case 'week':
                    key = format(startOfWeek(date), 'yyyy-MM-dd');
                    break;
                case 'month':
                    key = format(startOfMonth(date), 'yyyy-MM');
                    break;
                case 'year':
                    key = format(startOfYear(date), 'yyyy');
                    break;
            }

            const value = parseFloat(item.model.content.value);
            if (!isNaN(value)) {
                grouped[key] = (grouped[key] || 0) + value;
            }
        });

        return Object.entries(grouped).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    };

    const groupedData = getGroupedData();

    const data = {
        labels: groupedData.map(([key]) => key),
        datasets: [
            {
                label: 'Total Value',
                data: groupedData.map(([, value]) => value),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Transactions by ${grouping}`,
            },
        },
    };

    return (
        <div>
            <h2>Transactions Analysis</h2>
            <div>
                <button onClick={() => { setGrouping('day'); }}>Day</button>
                <button onClick={() => { setGrouping('week'); }}>Week</button>
                <button onClick={() => { setGrouping('month'); }}>Month</button>
                <button onClick={() => { setGrouping('year'); }}>Year</button>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
}
