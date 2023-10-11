import { useState } from "react";
import axios from "axios";
import { AutoComplete } from "antd";
import debounce from "lodash/debounce";

const LIMIT = 25;
const DEBOUNCE_TIME = 800;

const SearchBar = ({ onLocationSearch = (object?: any) => { return object } }) => {
  const [suggestions, setSuggestions] = useState([]);
  // const { searchResult, setSearchResult } = useMapItems;

  const handleSearch = (value: any) => {
    const newQuery = value;
    if (newQuery) {
      axios
        .get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            newQuery
          )}&format=json&limit=${LIMIT}&countrycodes=VN`
        )
        .then((response) => {
          const convertData = response.data.map((item: any) => ({
            label: item.display_name,
            value: item.display_name,
            extra: {
              lat: item.lat,
              lon: item.lon
            }
          }));
          setSuggestions(convertData);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  };

  return (
    <AutoComplete
      style={{ width: "30%" }}
      onSearch={debounce(handleSearch, DEBOUNCE_TIME)}
      onSelect={(value, option) => {
        const { extra = { lat: '0', lon: '0' } } = option;
        onLocationSearch({
          display_name: value,
          lat: extra.lat ? parseFloat(extra.lat) : undefined,
          lon: extra.lon ? parseFloat(extra.lon) : undefined,

        });

      }
    
    }
      placeholder="Search your place..."
      options={suggestions}
      allowClear
    />
  );
};

// SearchBar.propTypes = {
//   onLocationSearch: PropTypes.func
// }
export default SearchBar;
