import './styles/cell-list.css';

import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './AddCell';
import CellListItem from './CellListItem';
import { useActions } from '../hooks/use-actions';
// import { saveCells } from '../state/action-creators';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map((id) => data[id])
	);

	const { fetchCells } = useActions();

	useEffect(() => {
		fetchCells();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell previousCellId={cell.id} />
		</Fragment>
	));

	return (
		<div className='cell-list'>
			<AddCell forceVisble={true} previousCellId={null} />
			{renderedCells}
		</div>
	);
};

export default CellList;
