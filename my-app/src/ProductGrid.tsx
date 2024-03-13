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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function BuildWeekEndingColumn(data: IData) {
    const cells = data.sales.map(function (line, i) {
        return (
            <div className='GridCell' key={line.weekEnding + WeekendingHeader + i}>{line.weekEnding}</div>
        );
    });

    return (
        <div className='GridColumn' key={'GridColumn' + WeekendingHeader}>
            <div className='GridHeader' key={'GridHeader' + WeekendingHeader}>{WeekendingHeader}</div>
            {cells}
        </div>
    );
};

function BuildRetailSalesColumn(data: IData) {
    const cells = data.sales.map(function (line, i) {
        return (
            <div className='GridCell' key={line.weekEnding + RetailSalesHeader + i}>{formatter.format(line.retailSales)}</div>
        );
    });

    return (
        <div className='GridColumn' key={'GridColumn' + RetailSalesHeader}>
            <div className='GridHeader' key={'GridHeader' + RetailSalesHeader}>{RetailSalesHeader}</div>
            {cells}
        </div>
    );
};

function BuildWholeSalesSalesColumn(data: IData) {
    const cells = data.sales.map(function (line, i) {
        return (
            <div className='GridCell' key={line.weekEnding + WholeSalesSalesHeader + i}>{formatter.format(line.wholesaleSales)}</div>
        );
    });

    return (
        <div className='GridColumn' key={'GridColumn' + WholeSalesSalesHeader}>
            <div className='GridHeader' key={'GridHeader' + WholeSalesSalesHeader}>{WholeSalesSalesHeader}</div>
            {cells}
        </div>
    );
};

function BuildRetailerMarginColumn(data: IData) {
    const cells = data.sales.map(function (line, i) {
        return (
            <div className='GridCell' key={line.weekEnding + RetailerMarginHeader + i}>{formatter.format(line.retailerMargin)}</div>
        );
    });

    return (
        <div className='GridColumn' key={'GridColumn' + RetailerMarginHeader}>
            <div className='GridHeader' key={'GridHeader' + RetailerMarginHeader}>{RetailerMarginHeader}</div>
            {cells}
        </div>
    );
};

function BuildUnitsSoldColumn(data: IData) {
    const cells = data.sales.map(function (line, i) {
        return (
            <div className='GridCell' key={line.weekEnding + UnitsSoldHeader + i}>{line.unitsSold}</div>
        );
    });

    return (
        <div className='GridColumn' key={'GridColumn' + UnitsSoldHeader}>
            <div className='GridHeader' key={'GridHeader' + UnitsSoldHeader}>{UnitsSoldHeader}</div>
            {cells}
        </div>
    );
};

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
                        {BuildWeekEndingColumn(selector.usersData![0])}
                        {BuildRetailSalesColumn(selector.usersData![0])}
                        {BuildWholeSalesSalesColumn(selector.usersData![0])}
                        {BuildUnitsSoldColumn(selector.usersData![0])}
                        {BuildRetailerMarginColumn(selector.usersData![0])}
                    </div>
                </div>
            }
        </>
    )
}

export default ProductGrid