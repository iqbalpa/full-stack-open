import service from "./services/api";
import Country from "./components/Country";
import { useEffect, useState } from "react";

function App() {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState("");

	const handleChangeFilter = (e) => {
		setFilter(e.target.value);
	};

	useEffect(() => {
		if (filter !== "") {
			service
				.getAll()
				.then((res) => {
					const result = res.data;
					setCountries(result.filter((c) => c.name.common.toLowerCase().includes(filter)));
					// console.log(`filter: ${filter}`);
					// console.log(countries);
				})
				.catch((err) => {
					console.log("failed to fetch countries data");
				});
		}
		console.log("masuk useeffect");
	}, [filter]);

	return (
		<div className="App">
			<p>
				find countries <input onChange={handleChangeFilter} />
			</p>
			<Country country={countries} />
		</div>
	);
}

export default App;
