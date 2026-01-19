import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top navbar-custom'>
			<div className='container-fluid px-lg-5'>
				<a className='navbar-brand text-dark fw-bold' href='#!'>Lista de Contactos</a>
				<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link className="nav-link active" aria-current='page' to='/'>Home</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/contacts'>Contacts</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/add-contact'>Add new contact</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
