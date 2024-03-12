// ** React 
import PropTypes from "prop-types";

// ** Bootstrap
import { Button, Card } from "react-bootstrap";

// ** Component
import Details from "./Details/Details";

// ** Csss
import { card, img, btn, textDes } from "./index";
import "./NewsItem.css"

function NewsItem(props) {
  
  // ** Props
  const { imageUrl, alt, description, title, channel, published, urlNews } = props;

  return (
    <>
      <Card style={card} >
        <Card.Img style={img} variant="top" src={imageUrl} alt={alt} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={textDes}>{description ? description : "no founded"}</Card.Text>
          <Details channel={channel} published={published} />
          <Button href={urlNews} target="_blank" style={btn}>
            Read more →
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

NewsItem.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  channel: PropTypes.string,
  published: PropTypes.string,
  urlNews: PropTypes.string,
};

export default NewsItem;
