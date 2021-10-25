import './styles/code-cell.css';

import { useEffect } from 'react';
import Resizable from './Resizable';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import useCumulativeCode from '../hooks/useCumulativeCode';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { content, id } = cell;
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[id]);
	const cumulativeCode = useCumulativeCode(id);

	useEffect(() => {
		if (!bundle) {
			createBundle(id, cumulativeCode);
			return;
		}
		const timer = setTimeout(async () => {
			createBundle(id, cumulativeCode);
		}, 750);
		return () => {
			clearTimeout(timer);
		};
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, id, createBundle]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor input={content} onChange={(val) => updateCell(id, val)} />
				</Resizable>
				<div className='progress-wrapper'>
					{!bundle || bundle.loading ? (
						<div className='progress-cover'>
							<progress className='progress is-small is-primary' max='100'>
								Loading
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} errorDetails={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
