import './App.css';
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
import { IData, ISelectorState } from './app/userReducer';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { requestUsers } from './app/action';

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

function FixupDates(data: IData): chartData[] {
    const chartData = data.sales.map(f => (
        {
            weekEnding: f.weekEnding + 'Z',
            retailSales: f.retailSales,
            wholesaleSales: f.wholesaleSales,
        }
    )) as chartData[];

    let currentMonth = '';
    for (let i = 0; i < chartData.length; i++) {
        const date = new Date(chartData[i].weekEnding);
        const month = date.getUTCMonth() + 1;
        const monthString = GetMonthString(month);

        if (monthString !== currentMonth) {
            currentMonth = monthString;
            chartData[i].weekEnding = currentMonth;
        }
        else {
            chartData[i].weekEnding = '';
        }
    }

    return chartData;
}

function ProductSales() {
    const selector = useAppSelector(state => { return state.users }, shallowEqual) as ISelectorState;
    const dispatch = useAppDispatch() as any;

    useEffect(() => {
        dispatch(requestUsers(''));
    });

    return (
        <>
            {selector.isLoading && <div>Data loading...</div>}
            {!selector.isLoading && !selector.isError &&
                <div className="Sales">
                    <div className="SalesTop">
                        <p><b>Product Sales</b></p>
                    </div>
                    <div className="SalesBottom">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={FixupDates(selector.usersData![0])}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 10,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid horizontal={false} vertical={false} />
                                <XAxis dataKey='weekEnding' interval={0} />
                                <YAxis tick={false} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    name='Retail Sales'
                                    type="monotone"
                                    dataKey="retailSales"
                                    stroke="#8482ca"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    name='Wholesale Sales'
                                    type="monotone"
                                    dataKey="wholesaleSales"
                                    stroke="#0d0808" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            }
        </>
    );
}

export default ProductSales;