import { useEffect } from 'react';
import './App.css';
import { requestUsers } from './app/action';
import { shallowEqual } from 'react-redux';
import { IData, ISelectorState } from './app/userReducer';
import { useAppDispatch, useAppSelector } from './app/hooks';

function GetTags(data: IData) {
    var lines = data.tags.map(function (line, i) {
        return (
            <div className="TagDiv" key={i}>{line}</div>
        );
    });

    return lines;
}

function ProductDetails() {
    const selector = useAppSelector(state => { return state.users }, shallowEqual) as ISelectorState;
    const dispatch = useAppDispatch () as any;

    useEffect(() => {
        dispatch(requestUsers(''));
    });

    return (
        <>
            {selector.isLoading && <div>Data loading...</div>}
            {!selector.isLoading && !selector.isError &&
                <div className="Detail">
                    <div className="DetailTopContainer">
                        <div className="ProductImageContainer">
                            <img src={selector.usersData![0].image} className="ProductImage" alt="Product" />
                        </div>
                        <p><b>{selector.usersData![0].title}</b></p>
                        <p>{selector.usersData![0].subtitle}</p>
                    </div>
                    <div className="DetailBottomContainer">
                        <div className="TagContainer">
                            {GetTags(selector.usersData![0])}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ProductDetails;