"use client";

import { HistoryItem } from "@/actions";
import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import styles from "./TransactionSummary.module.css";

type Props = {
    history: HistoryItem[];
};

type TimeFrame = "day" | "week" | "month" | "year";

export default function TransactionSummary({ history }: Props) {
    const [timeFrame, setTimeFrame] = useState<TimeFrame>("day");

    const data = history.reduce((acc, item) => {
        const date = new Date(item.model.content.block_timestamp);
        const value = parseFloat(item.model.content.value);
        let key: string;

        switch (timeFrame) {
            case "day":
                key = date.toLocaleDateString();
                break;
            case "week":
                const week = Math.floor(date.getDate() / 7);
                key = `${date.getFullYear()}-W${week}`;
                break;
            case "month":
                key = `${date.getFullYear()}-${date.getMonth() + 1}`;
                break;
            case "year":
                key = `${date.getFullYear()}`;
                break;
        }

        if (!acc[key]) {
            acc[key] = { name: key, value: 0 };
        }
        acc[key].value += value;

        return acc;
    }, {} as Record<string, { name: string; value: number }>);

    const chartData = Object.values(data);

    return (
        <div className={styles.transaction_summary}>
            <h2>Transaction Summary</h2>
            <div className={styles.timeframe_buttons}>
                <button onClick={() => setTimeFrame("day")}>Day</button>
                <button onClick={() => setTimeFrame("week")}>Week</button>
                <button onClick={() => setTimeFrame("month")}>Month</button>
                <button onClick={() => setTimeFrame("year")}>Year</button>
            </div>
            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
