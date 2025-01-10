import React, { useState } from 'react';
import { Link } from "react-router-dom";

const MobileMenus = (props) => {
	const { item, currentLanguage, scrollToTop } = props;
	const [openMenus, setOpenMenus] = useState(false);

	const handleClicking = () => {
		setOpenMenus(false);
		scrollToTop();
	}

	return (
		<ul className="sub-menu">
			<li className="nonce-link menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
				<a
					href="javascript:void(0)"
					className="nav-link dropdown-toggle"
					onClick={() => setOpenMenus(!openMenus)}
				>
					<img src={item.icon} alt="" />
					{item.label}
				</a>

				{(openMenus) ? (
					<ul className="sub-menus">
						{item.child_recursive.map((submenuItem) => (
							<li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-644158">
								<Link
									to={`${currentLanguage}/${submenuItem.link}`}
									onClick={handleClicking}
								>
									<img src={submenuItem.icon} alt="" />
									{submenuItem.label}
								</Link>
							</li>
						))}
					</ul>
				) : null}
			</li>
		</ul>
	)
}

export default MobileMenus;