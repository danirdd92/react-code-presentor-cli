import './styles/text-editor.css';

import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
	cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState<boolean>(false);
	const { content, id } = cell;
	const { updateCell } = useActions();

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (ref.current && event.target && ref.current.contains(event.target as Node))
				return;
			setEditing(false);
		};
		document.addEventListener('click', listener, { capture: true });
		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div className='text-editor' ref={ref}>
				<MDEditor value={content} onChange={(val) => updateCell(id, val || '')} />
			</div>
		);
	}
	// Event prpgting
	return (
		<div className='text-editor' onClick={() => setEditing(true)}>
			<div className='card-content'>
				<MDEditor.Markdown source={content || '### Click To Edit'} />
			</div>
		</div>
	);
};
export default TextEditor;
