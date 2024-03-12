// ** React
import PropTypes from "prop-types"

// ** Css
import { details, summarry, text } from "./index";

// ** Config
import { summary, newsChannel, lastUpdate } from "config/config";

function Details(props) {
  const { channel, published } = props;
  return (
    <details style={details}>
      <summary style={summarry}>{summary}</summary>
      <p style={text}>{newsChannel(channel)}</p>
      <p style={text}>{lastUpdate(published)}</p>
    </details>
  );
}

Details.propTypes = {
  channel: PropTypes.string,
  published: PropTypes.string,
};

export default Details