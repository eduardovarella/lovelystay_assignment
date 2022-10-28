import './Paginator.css';

function Paginator(props){

    const first = (props.current - 1)*props.perpage + 1;
    const last = first + props.items.length - 1;
    const isFirstPage = props.current === 1;
    const isLastPage = last === props.total;

    return <div className='paginator'>
            <div className='message'>Showing results {first} to {last}, of a total of {props.total} items</div>
            <div className='navigation'>
                { !isFirstPage && <div className='previous' onClick={() => props.onPaginate(props.current - 1)}>Previous Page</div> }
                <div className='spacer'></div>
                { !isLastPage && <div className='next' onClick={() => props.onPaginate(props.current + 1)}>Next Page</div> }
            </div>
        </div>
}

export default Paginator;