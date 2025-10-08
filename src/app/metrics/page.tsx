
'use client';

import { fetchUsers, UsersResponse } from "@/lib/api";
import { useEffect, useState, useMemo } from "react";

import { useLocalOrders, LocalOrder } from "@/context/LocalOrdersContext"; 
import SevenDayRevenueChart from "@/components/SevenDayRevenueChart";

const calculateSevenDayMetrics = (orders: LocalOrder[]) => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    
    const recentOrders = orders.filter(order => order.createdAt >= sevenDaysAgo);

    const totalRevenue = recentOrders.reduce((sum, order) => sum + order.total, 0);

    const dailyData = Array(7).fill(0); 

    recentOrders.forEach(order => {

      const orderDate = new Date(order.createdAt);
        const today = new Date();

        const diffTime = today.getTime() - orderDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        

        if (diffDays >= 0 && diffDays < 7) {

            const index = 6 - diffDays; 
            dailyData[index] += order.total;
        }
    });

    return {
        orderCount: recentOrders.length,
        revenue: totalRevenue,
        dailyRevenue: dailyData,
    };
};


export default function Metrics() {


    const [users, setUsers] = useState<UsersResponse | undefined>(undefined); 
    
    const { localOrders } = useLocalOrders();


    const metrics = useMemo(() => calculateSevenDayMetrics(localOrders), [localOrders]);


    useEffect(() => {
        const loadUsers = async () => {
            try {

                const users: UsersResponse = await fetchUsers(); 
                setUsers(users);
            } catch (error) {
                console.error("Failed to fetch Users:", error);
            }
        }
        loadUsers()
    }, []);

    return (
        <div className="grid md:grid-cols-3 gap-4">

            <div className="card bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Utilisateurs</div>
                <div className="text-2xl font-semibold">
                    { users ? users.total : "..." }
                </div>
            </div>


            <div className="card bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Orders 7j (local)</div>
                <div className="text-2xl font-semibold">
                    {metrics.orderCount}
                </div>
            </div>


            <div className="card bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Revenu 7j (local)</div>
                <div className="text-2xl font-semibold text-green-600">
                    ${metrics.revenue.toFixed(2)}
                </div>
            </div>

            {/* Chart */}
            <div className="card md:col-span-3 bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600 mb-2">Évolution 7 jours (Revenu)</div>

                <div className="h-24 pt-10 bg-gray-100 border border-dashed flex items-center justify-center text-gray-400">

                    {metrics.dailyRevenue.length > 0 && (
                    <SevenDayRevenueChart dailyRevenue={metrics.dailyRevenue} />
                    )}
                </div>
            </div>
        </div>
    );
}