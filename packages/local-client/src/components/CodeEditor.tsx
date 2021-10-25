import './styles/code-editor.css';

import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

type CodeEditorProps = {
	input: string;
	onChange: (input: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ input, onChange }) => {
	const onEditorChange = (code: string | undefined) => onChange(code || '');
	const onFormatClick = () => {
		const formattedCode = prettier
			.format(input, {
				parser: 'babel',
				plugins: [parser],
				useTabs: false,
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, '');
		onEditorChange(formattedCode);
	};

	return (
		<div className='editor-wrapper'>
			<button className='button button-format is-primary' onClick={onFormatClick}>
				Format
			</button>
			<MonacoEditor
				theme='vs-dark'
				height='100%'
				defaultLanguage='javascript'
				value={input}
				onChange={onEditorChange}
				options={{
					formatOnType: true,
					minimap: {
						enabled: false,
					},
					wordWrap: 'on',
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
					tabSize: 2,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
