import './App.css';
import { IData, ISelectorState } from './app/userReducer';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { requestUsers } from './app/action';

const WeekendingHeader = 'Week Ending';
const RetailSalesHeader = 'Retail Sales';
const WholeSalesSalesHeader = 'Wholesale Sales';
const UnitsSoldHeader = 'Units Sold';
const RetailerMarginHeader = 'Retailer Margin';

function BuildColumn(headerText: string, data: IData) {
    var cells = data.sales.map(function (line, i) {
        return (
            <>
                {headerText === WeekendingHeader &&
                    <div className='GridCell' key={headerText + i}>{line.weekEnding}</div>
                }
                {headerText === RetailSalesHeader &&
                    <div className='GridCell' key={headerText + i}>{line.retailSales}</div>
                }
                {headerText === WholeSalesSalesHeader &&
                    <div className='GridCell' key={headerText + i}>{line.wholesaleSales}</div>
                }
                {headerText === UnitsSoldHeader &&
                    <div className='GridCell' key={headerText + i}>{line.unitsSold}</div>
                }
                {headerText === RetailerMarginHeader &&
                    <div className='GridCell' key={headerText + i}>{line.retailerMargin}</div>
                }
            </>
        );
    });

    return (
        <div className='GridColumn'>
            <div className='GridHeader'>{headerText}</div>
            {cells}
        </div>
    );
}

function ProductGrid() {
    const selector = useAppSelector(state => { return state.users }, shallowEqual) as ISelectorState;
    const dispatch = useAppDispatch() as any;

    useEffect(() => {
        dispatch(requestUsers(''));
    });

    return (
        <>
            {selector.isLoading && <div>Data loading...</div>}
            {!selector.isLoading && !selector.isError &&
                <div className='ProductGrid'>
                    <div className='GridContainer'>
                        {BuildColumn(WeekendingHeader, selector.usersData![0])}
                        {BuildColumn(RetailSalesHeader, selector.usersData![0])}
                        {BuildColumn(WholeSalesSalesHeader, selector.usersData![0])}
                        {BuildColumn(UnitsSoldHeader, selector.usersData![0])}
                        {BuildColumn(RetailerMarginHeader, selector.usersData![0])}
                    </div>
                </div>
            }
        </>
    )
}

export default ProductGrid