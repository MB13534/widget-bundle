import React from "react";
import axios from "axios";

const WikiSearch = () => {
  const [term, setTerm] = React.useState("Newfoundland Dog");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);
  //the second item will always either be empty, an empty array, or an arrary with items in it
  //empty array means it will only run at initial render
  //no array means it will run at first render and every following render
  //array with items in it will run at initiali render and (every rerender if that data has changed)

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`http://en.wikipedia.org?curid=${result.pageid}`}
            className="ui button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input type="text" value={term} onChange={handleChange} />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default WikiSearch;
