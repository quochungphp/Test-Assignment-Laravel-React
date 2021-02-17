import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
  			<div>
				<div className="tagline-upper text-center text-heading text-shadow text-white mt-5 d-none d-lg-block">Test Assignment - Le Quoc Hung</div>
			    <div className="tagline-lower text-center text-expanded text-shadow text-uppercase text-white mb-5 d-none d-lg-block">Ho Chi Minh | City | 077.888.9593</div>
			</div>
		);
	}
}

export default Header;
