// ** React
import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ** Images
import NullImage from "Images/nullImage.png";

//**  Component
import CirculeLoader from "@nub/components/CirculeLoader";
import NewsItem from "@nub/components/NewsItem/NewsItem";

// ** Bootstrap
import { Col, Row } from "react-bootstrap";

// ** Config
import { header } from "config/config";


// ** services
import NEWSAPISERVICE from 'services/newsapi.service'

// ** Css
import './Search.css'


const Home = () => {

    //** States
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const location = useLocation();

    // ** reacts
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword');
  
    const capitaLize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updatenews = async (keyword) => {
        let payload = {};
        console.log("keyword",keyword)
        if (keyword)
            payload.article = keyword
        if (Object.keys(payload).length === 0) return

        try {
            setLoading(true);
            const [success, error] = await NEWSAPISERVICE.getNewsapi(payload);
            if (success) {
                const { data } = success
                setArticles(data.articles);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
     
        updatenews(keyword);
    }, [location]);

    return (
        <>
            {loading ? (
                <CirculeLoader />
            ) : (
                <>
                    <h1 className="Header">{header(capitaLize(keyword))}</h1>
                    <div className="Container">
                        <Row>
                            {articles.length === 0 ?
                                <div style={{ height: "60vh", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "30px", fontStyle: "italic" }}>

                                    <p>Data not founded</p>
                                </div>
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
                    </div >
                </>
            )}
        </>
    )
}

export default Home