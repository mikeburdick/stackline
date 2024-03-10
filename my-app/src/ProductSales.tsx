import { current } from '@reduxjs/toolkit';
import './App.css';
import myData from './data.json';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

interface chartData {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
}

function GetMonthString(month: number): string {
    switch (month) {
        case 1:
            return 'Jan';

        case 2:
            return 'Feb';

        case 3:
            return 'Mar';

        case 4:
            return 'Apr';

        case 5:
            return 'May';

        case 6:
            return 'Jun';

        case 7:
            return 'Jul';

        case 8:
            return 'Aug';

        case 9:
            return 'Sep';

        case 10:
            return 'Oct';

        case 11:
            return 'Nov';

        case 12:
            return 'Dec';

        default:
            return '';
    }
}

function ProductSales() {
    const json = myData;
    const data = json[0].sales.map(f => (
        {
            weekEnding: f.weekEnding + 'Z',
            retailSales: f.retailSales,
            wholesaleSales: f.wholesaleSales,
        }
    )) as chartData[];

    let currentMonth = '';
    for (let i = 0; i < data.length; i++) {
        const date = new Date(data[i].weekEnding);
        const month = date.getUTCMonth() + 1;
        const monthString = GetMonthString(month);

        if (monthString != currentMonth) {
            currentMonth = monthString;
            data[i].weekEnding = monthString;
        }
        else {
            data[i].weekEnding = '';
        }
    }

    return (
        <div className="Sales">
            <div className="SalesTop">
                <p><b>Product Sales</b></p>
            </div>
            <div className="SalesBottom">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 10,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="weekEnding" />
                        <YAxis tick={false} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="retailSales"
                            stroke="#8482ca"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="wholesaleSales" stroke="#0d0808" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ProductSales;