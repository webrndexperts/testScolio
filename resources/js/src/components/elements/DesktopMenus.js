import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import MobileMenus from './MobileMenus';

const DesktopMenus = (props) => {
	const {
		menuItem, currentLanguage, scrollToTop, handleMouseEnter, toggleMenu, handleMouseLeave, index, menuData,
		openMenus, isMobile, mobileScreen
	} = props;

	const handleClicking = (id = null) => {
		scrollToTop();

		// if(window.innerWidth <= mobileScreen && id) {
			toggleMenu(id);
		// }
	}

	return (
		<Fragment>
			{menuItem.child_recursive.length <= 0 ? (
				<Link
					className={
						menuItem.child_recursive.length <= 0
						? "nav-link"
						: "nav-link dropdown-toggle"
					}
					to={`${currentLanguage}${menuItem.link}`}
					onClick={scrollToTop}
					key={index}
				>
					{menuItem.label}
				</Link>
			) : (
				<li
					key={index}
					
					onMouseEnter={() => handleMouseEnter(menuItem.id)}
					onMouseLeave={() => handleMouseLeave(menuItem.id)}
					className={`nav-item dropdown dropdown-${menuItem.class}`}
				>
					<Link
						className={
							menuItem.child_recursive.length <= 0
							? "nav-link"
							: "nav-link dropdown-toggle"
						}
						id={`dropdownMenuButton${menuItem.class}`}
						role="button"
						aria-haspopup="true"
						aria-expanded="false"
						onClick={() => toggleMenu(menuItem.id)}
					>
						{menuItem.label}
						<img src={menuData.icon} alt="" />
					</Link>

					{openMenus[menuItem.id] && (
						<div
							className={`dropdown-menu sm-menu-${menuItem.class}`}
							aria-labelledby={`navbarDropdown${menuItem.class}`}
						>
							<div className="row test2 qwe">
								{menuItem.child_recursive.map((item) => (
									<Fragment key={item.id}>
										{item.child_recursive.length <= 0 ? (
											<div
												className={`col-sm-12 col-lg-12 mb-12 ${item.class}`}
											>
												<ul>
													<li>
														<Link
															to={`${currentLanguage}/${item.link}`}
															onClick={() => { handleClicking(menuItem.id) }}
														>
															{item.label}
														</Link>
														<img src={item.icon} alt="" />
													</li>
												</ul>
											</div>
										) : (
											<div
												className={`col-sm-4 col-lg-4 mb-4  ${item.class}`}
											>
												{(isMobile) ? (
													<MobileMenus
														item={item}
														scrollToTop={() => { handleClicking(menuItem.id) }}
														currentLanguage={currentLanguage}
													/>
												) : (
													<Fragment>
														<p>{item.label}</p>
														{item.child_recursive.map((submenuItem) => (
															<Link
																key={submenuItem.id}
																className={`dropdown-item ${submenuItem.id}` }
																to={`${currentLanguage}/${submenuItem.link}`}
																onClick={() => { handleClicking(menuItem.id) }}
															>
																<img src={submenuItem.icon} alt="" />
																{submenuItem.label}
															</Link>
														))}
													</Fragment>
												)}
											</div>
										)}
									</Fragment>
								))}
							</div>
						</div>
					)}
				</li>
			)}
		</Fragment>
	)
}

export default DesktopMenus;