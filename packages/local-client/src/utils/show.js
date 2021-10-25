export const showFunc = `
				import _React from 'react'
				import _ReactDOM from 'react-dom'

				var show = (val) => {
					const root = document.getElementById('root')

					if(typeof val === 'object'){
						if(val.$$typeof && val.props){
							_ReactDOM.render(val, root);
						} else{
							root.innerHTML = JSON.stringify(val);
						}
					} else {
						root.innerHTML = val;
					}
				}
			`;
export const showFuncNoOperation = 'var show = () => {}';
