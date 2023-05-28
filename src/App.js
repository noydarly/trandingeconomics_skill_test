// App.js
import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import GDPChart from "./GDPChart";
import GDPTable from "./GDPTable";
import Alert from "@mui/material/Alert";

const App = () => {

  const allowedCountries = [
    { value: "Sweden", label: "Sweden" },
    { value: "Mexico", label: "Mexico" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Thailand", label: "Thailand" },
  ];

  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);

  const [indicator, setIndicator] = useState("");

  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [gdpData1, setGdpData1] = useState(null);
  const [gdpData2, setGdpData2] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (country, indicator, setData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/history/${country}/${indicator}`
      );
      const responseData = await response.json();
      if (responseData?.success) {
        setData(responseData?.data ?? []);
        setError('');
      } else {
        setError(responseData?.message);
      }
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/countries`
      );
      const responseData = await response.json();
      if (responseData?.success) {
        setCountries(responseData?.data ?? []);
        setError('');
      } else {
        setError(responseData?.message);
        setCountries([]);
      }
    } catch (error) {
      console.error(error);
      setCountries([]);
    }
  };

  const fetchIndicators = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/indicators`
      );
      const responseData = await response.json();
      if (responseData?.success) {
        setIndicators(responseData?.data ?? []);
        setError('');
      } else {
        setError(responseData?.message);
        setIndicators([]);
      }
    } catch (error) {
      console.error(error);
      setIndicators([]);
    }
  };

  useEffect(() => {
    if (country1 && indicator) {
      fetchData(country1, indicator, setGdpData1);
    }
  }, [country1, indicator]);

  useEffect(() => {
    if (country2 && indicator) {
      fetchData(country2, indicator, setGdpData2);
    }
  }, [country2, indicator]);

  useEffect(() => {
    fetchCountries();
    fetchIndicators();
  }, [
  ]);

  return (
    <div className="App">
      <AppBar position="static">
        <Container maxWidth="xl">
          <p>
            A skill test task from <strong>Tradingeconomics</strong>
          </p>
          <p>
            I have created a free API key and it provides only 4 countries(Sweden, Mexico, New Zealand, Thailand).
          </p>
          <p>Select an indicator from the Indciators drop-down and then select 2 countries you want to compare with each other.</p>
        </Container>
      </AppBar>
      <Container>
        <Grid container spacing={2} sx={{ marginTop: "40px", marginBottom: '40px' }}>
          <Grid item xs={12} md={12}>
            {error && (
              <Alert severity="error">{error}</Alert>
            )}
            <FormControl fullWidth>
              <InputLabel id="indicator-select">Indicators</InputLabel>
              <Select
                labelId="indicator-select"
                label="Indicators"
                value={indicator}
                onChange={(event) => {
                  setIndicator(event.target.value);
                }}
              >
                {indicators.map((indicator, index) => (
                  <MenuItem key={indicator.Category} value={indicator.Category}>
                    {indicator.Category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="country-select1">Countries</InputLabel>
              <Select
                labelId="country-select1"
                label="Countries"
                value={country1}
                onChange={(event) => {
                  setCountry1(event.target.value);
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.Country} value={country.Country}>
                    {country.Country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {gdpData1 && (<GDPChart chartData={gdpData1} width={'100%'} height={300} color={'#ff0000'} />)}
            {gdpData1 && (<GDPTable chartData={gdpData1} width={'100%'} height={300} color={'#ff0000'} />)}
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="country-select2">Countries</InputLabel>
              <Select
                labelId="country-select2"
                label="Countries"
                value={country2}
                onChange={(event) => {
                  setCountry2(event.target.value);
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.Country} value={country.Country}>
                    {country.Country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {gdpData2 && (<GDPChart chartData={gdpData2} width={'100%'} height={300} color={'#00ff00'} />)}
            {gdpData2 && (<GDPTable chartData={gdpData2} width={'100%'} height={300} color={'#ff0000'} />)}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
