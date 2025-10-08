'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SevenDayRevenueChartProps {
    dailyRevenue: number[]; 
}

const getDayLabels = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const labels = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(days[date.getDay()]);
    }
    return labels;
};

export default function SevenDayRevenueChart({ dailyRevenue }: SevenDayRevenueChartProps) {
    
    const labels = getDayLabels();
    const data = dailyRevenue.map((revenue, index) => ({
        day: labels[index],
        revenue: parseFloat(revenue.toFixed(2)), 
    }));

    return (
        <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '10px' }} />
                <YAxis dataKey="revenue" stroke="#6B7280" style={{ fontSize: '10px' }} domain={[0, 'auto']} />
                <Tooltip 
                    cursor={{ fill: '#F3F4F6' }} 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']} 
                    labelFormatter={(label) => `Day: ${label}`}
                />
                <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}