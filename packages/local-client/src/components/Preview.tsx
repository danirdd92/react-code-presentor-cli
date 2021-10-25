import './styles/preview.css';
import html from '../utils/html-boiler-plate';
import { useEffect, useRef } from 'react';
interface PreviewProps {
	code: string;
	errorDetails: string;
}

const Preview: React.FC<PreviewProps> = ({ code, errorDetails }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className='preview-wrapper'>
			<iframe title='preview' ref={iframe} sandbox='allow-scripts' srcDoc={html} />
			{errorDetails && <div className='preview-error'>{errorDetails}</div>}
		</div>
	);
};

export default Preview;
