import React from 'react';
import './tabswitcher.css';


export function TabSwitcher(props) {
	const { onTabChange, value } = props;
	return <div className="tabswitcher">
		<div className={value==='teachers' ? 'active' : ''} onClick={()=>onTabChange('teachers')}>
			მასწავლებლები
		</div>
		<div className={value==='students' ? 'active' : ''} onClick={()=>onTabChange('students')}>
			მოსწავლეები
		</div>
		<div className={value==='classes' ? 'active' : ''} onClick={()=>onTabChange('classes')}>
			კლასები
		</div>
	</div>
}