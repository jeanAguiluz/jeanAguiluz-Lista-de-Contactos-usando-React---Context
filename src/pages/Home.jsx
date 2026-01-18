import { Link } from "react-router-dom";
import "../styles/home.css";

export const Home = () => {
	return (
		<section className="home-hero d-flex align-items-center justify-content-center text-center">
			<div className="container">
				<h1 className="display-4 fw-bold text-white mb-3">
					Contact Manager
				</h1>
				<p className="lead text-white-50 mb-4 px-2">
					Organize, create and manage all your contacts in one place.
				</p>
				<Link
					to="/contacts"
					className="btn btn-light btn-lg px-4 py-2 fw-semibold shadow-sm"
					style={{ borderRadius: "12px" }}
				>
					View Contacts
				</Link>

			</div>
		</section>
	);
};