import React from 'react';
import { Link } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

const MobileAuthMenu = (props) => {
	const {
		currentLanguage, scrollToTop, handleMouseEnter, toggleMenu, handleMouseLeave, authLogin, getTotalQuantity,
		openMenus, t, logoutFailure, logoutSuccess, clientId
	} = props;
	const authRoutes = [
		{
			path: `${currentLanguage}/${(getTotalQuantity() && getTotalQuantity() > 0) ? 'checkout' : 'shop'}`,
			title: t("main-nav.Checkout")
		},
		{ path: `${currentLanguage}/cart`, title: t("main-nav.Cart") },
	];
	const unAuthRoutes = [
		{ path: `/login`, title: t("main-nav.Login/Register") },
		{ path: `${currentLanguage}/cart`, title: t("main-nav.Cart") }
	];

	const showRoutes = (authLogin) ? authRoutes : unAuthRoutes;

	const handleClicking = () => {
		scrollToTop();
	}

	return (
		<li
			onMouseEnter={() => handleMouseEnter('auth')}
			onMouseLeave={() => handleMouseLeave('auth')}
			className={`nav-item dropdown dropdown-parent-about`}
		>
			<Link
				className="nav-link dropdown-toggle"
				id={`dropdownMenuButtonparent-auth`}
				role="button"
				aria-haspopup="true"
				aria-expanded="false"
				onClick={() => toggleMenu('auth')}
			>
				{t("main-nav.My Account")}
			</Link>

			{(openMenus['auth']) ? (
				<div className="dropdown-menu sm-menu-parent-about" aria-labelledby="navbarDropdownparent-auth">
					<div className="row test2 qwe">

						{showRoutes.map((menu, ind) => {
							return (
								<div className="col-sm-12 col-lg-12 mb-12" key={ind}>
									<ul>
										<li>
											<Link
												to={menu.path}
												onClick={handleClicking}
											>
												{menu.title}
											</Link>
										</li>
									</ul>
								</div>
							)
						})}

						{(authLogin) ? (
							<div className="col-sm-12 col-lg-12 mb-12 mobile-logout-btn">
								<ul>
									<li>
										<GoogleLogout
											clientId={clientId}
											buttonText="Logout"
											onLogoutSuccess={logoutSuccess}
											onFailure={logoutFailure}
											render={(renderProps) => (
												<button
													onClick={renderProps.onClick}
													disabled={renderProps.disabled}
												>
													{t("main-nav.Logout")}
												</button>
											)}
										/>
									</li>
								</ul>
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</li>
	)
}

export default MobileAuthMenu;