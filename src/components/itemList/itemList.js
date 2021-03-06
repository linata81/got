//рефакторинг компонента с использованием хуков

import React, { useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../spinner';

function ItemList({ getData, onItemSelected, renderItem }) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })
    }, [])

    function renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    if (!itemList) {
        return <Spinner />
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );

}

export default ItemList;


//старый формат

// import React, { Component } from 'react';
// import './itemList.css';
// import Spinner from '../spinner';
// import PropTypes from 'prop-types';
// export default class ItemList extends Component {

//     state = {
//         itemList: null
//     }

//     componentDidMount() {
//         const { getData } = this.props;

//         getData()
//             .then((itemList) => {
//                 this.setState({
//                     itemList
//                 })
//             })
//     }

//     renderItems(arr) {
//         return arr.map((item) => {
//             const { id } = item;
//             const label = this.props.renderItem(item);
//             return (
//                 <li
//                     key={id}
//                     className="list-group-item"
//                     onClick={() => this.props.onItemSelected(id)}>
//                     {label}
//                 </li>
//             )
//         })
//     }

//     render() {

//         const { itemList } = this.state;

//         if (!itemList) {
//             return <Spinner />
//         }

//         const items = this.renderItems(itemList);

//         return (
//             <ul className="item-list list-group">
//                 {items}
//             </ul>
//         );
//     }
// }

// ItemList.defaultProps = {
//     onItemSelected: () => { }
// }

// ItemList.propTypes = {
//     onItemSelected: PropTypes.func,
// }