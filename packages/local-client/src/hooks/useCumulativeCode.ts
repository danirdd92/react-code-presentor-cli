import { showFunc, showFuncNoOperation } from '../utils/show';
import { useTypedSelector } from './use-typed-selector';

const useCumulativeCode = (cellId: string) => {
	// Let code cells share code
	return useTypedSelector((state) => {
		const { data, order } = state.cells;
		const orderedCells = order.map((id) => data[id]);

		const _cumulativeCode = [];
		for (let c of orderedCells) {
			if (c.type === 'code') {
				// replace show function to no operation on unrelated code cell
				c.id === cellId
					? _cumulativeCode.push(showFunc)
					: _cumulativeCode.push(showFuncNoOperation);

				_cumulativeCode.push(c.content);
			}
			if (c.id === cellId) break;
		}

		return _cumulativeCode;
	}).join('\n');
};
export default useCumulativeCode;
