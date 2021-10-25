import { ActionType } from '../action-types';
import axios from 'axios';
import { Dispatch } from 'react';
import {
	Action,
	Direction,
	DeleteCellAction,
	InsertCellAfterCellAction,
	MoveCellAction,
	UpdateCellAction,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundler';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: {
			id,
			content,
		},
	};
};

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id,
	};
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: {
			id,
			direction,
		},
	};
};

export const insertCellAfter = (
	id: string | null,
	type: CellTypes
): InsertCellAfterCellAction => {
	return {
		type: ActionType.INSERT_CELL_AFTER,
		payload: {
			id,
			type,
		},
	};
};

export const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId,
			},
		});
		const result = await bundle(input);
		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: result,
			},
		});
	};
};

export const fetchCells = () => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.FETCH_CELLS });

		try {
			const { data }: { data: Cell[] } = await axios.get('/cells');

			dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
		} catch (err: any) {
			dispatch({
				type: ActionType.FETCH_CELLS_ERROR,
				payload: err.message,
			});
		}
	};
};

export const saveCells = () => {
	return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
		const {
			cells: { data, order },
		} = getState();

		const cells = order.map((id) => data[id]);
		try {
			await axios.post('/cells', { cells });
		} catch (err: any) {
			dispatch({
				type: ActionType.SAVE_CELLS_ERROR,
				payload: err.message,
			});
		}
	};
};