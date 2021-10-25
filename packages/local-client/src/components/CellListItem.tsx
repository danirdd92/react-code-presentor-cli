import './styles/cell-list-item.css';

import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';
interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let child: JSX.Element;

	const actionBar = (
		<div className='action-bar-wrapper'>
			<ActionBar id={cell.id} />
		</div>
	);

	if (cell.type === 'code') {
		child = (
			<>
				{actionBar}
				<CodeCell cell={cell} />
			</>
		);
	} else
		child = (
			<>
				{actionBar}
				<TextEditor cell={cell} />
			</>
		);

	return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
