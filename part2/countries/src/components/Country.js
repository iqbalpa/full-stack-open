import { useEffect, useState } from "react";
import service from "../services/api";

const Country = ({ country }) => {
	const numOfCountries = country.length;
	const [data, setData] = useState(null);

	useEffect(() => {
		if (numOfCountries > 0) {
			service
				.getByName(country[0].name.common.toLowerCase())
				.then((res) => {
					setData(res.data);
					console.log(res.data);
				})
				.catch((err) => console.log("failed to fetch a country"));
		}
	}, [numOfCountries, country]);

	if (numOfCountries === 0) return;
	const countriesName = country.map((c) => c.name.common);

	return (
		<>
			{numOfCountries === 1 && (
				<div>
					<h1>{data.name.common}</h1>
					<p>capital {data.capital}</p>
					<p>area {data.area}</p>
					<h3>languages</h3>
					<ul>
						{Object.keys(data.languages).map((key, index) => (
							<li key={key}>{data.languages[key]}</li>
						))}
					</ul>
					<img src={data.flags.svg} alt={data.flags.alt} />
				</div>
			)}
			{numOfCountries >= 2 && numOfCountries <= 10 && (
				<div>
					{countriesName.map((name) => (
						<p key={name}>{name}</p>
					))}
				</div>
			)}
			{numOfCountries > 10 && <p>Too many matches, specify another filter</p>}
		</>
	);
};

export default Country;
