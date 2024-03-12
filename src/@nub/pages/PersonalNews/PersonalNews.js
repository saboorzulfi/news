// ** React
import  { useEffect, useState } from "react";

// ** Images
import NullImage from "Images/nullImage.png";

// ** Components
import CirculeLoader from "@nub/components/CirculeLoader";
import NewsItem from "@nub/components/NewsItem/NewsItem";
import Personalized from "@nub/components/Personalized";

// ** Bootstrap
import { Button, Col, Row } from "react-bootstrap";

// ** Config
import { header } from "config/config";

// ** Services
import NEWSAPISERVICE from 'services/newsapi.service'


// ** Css
import './PersonalNews.css'

//** Utils
import LocalStorage from "utils/localStorage.util";

const News = () => {

  // ** States
  const [loading, setLoading] = useState(false);
  const [isPersonalize, setIspersonalize] = useState(LocalStorage.getItem("source") ? false : true)
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const updatenews = async () => {
    let category = LocalStorage.getItem("category")
    if (category) {
      let payload = {}
      payload.category = category
      try {
        setLoading(true);
        const [success, error] = await NEWSAPISERVICE.getNewsapi();
        if (success) {
          const { data } = success
          setArticles(data.articles);
          setLoading(false);
          setIspersonalize(false)
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    let source = LocalStorage.getItem("source")
    if (source) {

      let payload = {}
      payload.source = source
      console.log("payload",payload)
      try {
        setLoading(true);
        const [success, error] = await NEWSAPISERVICE.getNewsapi(payload);
        if (success) {
          const { data } = success
          setSources(data.articles);
          setLoading(false);
          setIspersonalize(false)
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }

    }
  };

  useEffect(() => {
    if (!LocalStorage.getItem("category") && !LocalStorage.getItem("source")) {
      setIspersonalize(true)
      return
    }
    updatenews();
  }, []);

  const handleSetPersonalizeFeed=()=>{
    localStorage.removeItem("category")
    localStorage.removeItem("source")
    setIspersonalize(true)
  }

  return (
    <>
      {loading ? (
        <CirculeLoader />
      ) : (
        <>
          <div className="Container mt-5">
           {LocalStorage.getItem("category") && LocalStorage.getItem("source")?
            <div className="text-end">
            <Button onClick={()=>handleSetPersonalizeFeed()}>Personalize your feed again</Button>
            </div>
            :null}
            {isPersonalize ?
              <div className="PersonalizeWrapper">
                <Personalized handleCallbackApi={updatenews} />
              </div> :
              <>
                <Row className="mt-6">
                  <h2 className="PersonalizeHeader">{header(capitaLize("Category"))}</h2>
                  {articles.length === 0 ?
                    <p>Data not founded</p>
                    : articles.map((element, index) => {
                      return (
                        <Col sm={12} md={6} lg={4} xl={3} className="card-col" key={index}>
                          <NewsItem
                            title={element.title}
                            description={element.description}
                            published={element.publishedAt}
                            channel={element.source.name}
                            alt="News image"
                            publishedAt={element.publishedAt}
                            imageUrl={
                              element.urlToImage === null ? NullImage : element.urlToImage
                            }
                            urlNews={element.url}
                          />
                        </Col>
                      );
                    })}
                </Row>
                <Row>
                  <h2 className="PersonalizeHeader">{header(capitaLize("Source"))}</h2>
                  {sources.length === 0 ?
                    <p>Data not founded</p>
                    : sources.map((element, index) => {
                      return (
                        <Col sm={12} md={6} lg={4} xl={3} className="card-col" key={index}>
                          <NewsItem
                            title={element.title}
                            description={element.description}
                            published={element.publishedAt}
                            channel={element.source.name}
                            alt="News image"
                            publishedAt={element.publishedAt}
                            imageUrl={
                              element.urlToImage === null ? NullImage : element.urlToImage
                            }
                            urlNews={element.url}
                          />
                        </Col>
                      );
                    })}
                </Row>
              </>

            }
          </div >
        </>
      )}
    </>
  )
}

export default News