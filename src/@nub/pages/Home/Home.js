
// ** React
import  { useEffect, useState } from "react";

// ** Images
import NullImage from "Images/nullImage.png";

// ** Components
import CirculeLoader from "@nub/components/CirculeLoader";
import NewsItem from "@nub/components/NewsItem/NewsItem";
import Filters from "@nub/components/filters/Filters";

// ** Bootstrap
import { Col, Row } from "react-bootstrap";

// ** Config
import { header } from "config/config";

// ** Service
import NEWSAPISERVICE from 'services/newsapi.service'

// ** Css
import './Home.css'

// ** Third party imports
import moment from "moment";


const Home = () => {
    // ** States
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('');
    const [searchSource, setSearchSource] = useState('');
    const [searchArticles, setSearchArticle] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const capitaLize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    document.title = `${capitaLize(filterCategory !== "" ? filterCategory : "General")} - News`;

    const updatenews = async () => {
        try {
            setLoading(true);
            const [success, error] = await NEWSAPISERVICE.getNewsapi();
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
        setStartDate(null)
        setEndDate(null)
        setCategory('')
        setSearchArticle("")
        setSearchSource("")
        updatenews();
    }, []);



    const handleSubmit = async () => {
        let payload = {};
        if (startDate && endDate) {
            payload.startDate = moment(startDate).format("YYYY-MM-DD")
            payload.endDate = moment(endDate).format("YYYY-MM-DD")
        }
        if (category) {
            payload.category = category
            setFilterCategory(category)
        }
        if (searchSource)
            payload.source = searchSource
        if (searchArticles)
            payload.article = searchArticles

        if (Object.keys(payload).length === 0) return
        try {
            setLoading(true);
            const [success, error] = await NEWSAPISERVICE.getNewsapi(payload);
            if (success) {
                const { data } = success
                setArticles(data.articles);
                setLoading(false);
            } else
                setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error(error);
        }

    };

    const reset = () => {
        setStartDate(null)
        setEndDate(null)
        setCategory('')
        setSearchArticle("")
        setSearchSource("")
        updatenews();
    }
    return (
        <>
            {loading ? (
                <CirculeLoader />
            ) : (
                <>
                    <h1 className="Header">{header(capitaLize(filterCategory !== "" ? filterCategory : "General"))}</h1>
                    <div className="Container">
                        <p className="FilterHeader">Filter by</p>

                        <Filters
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            category={category}
                            setCategory={setCategory}
                            searchSource={searchSource}
                            setSearchSource={setSearchSource}
                            searchArticles={searchArticles}
                            setSearchArticle={setSearchArticle}
                            handleSubmit={handleSubmit}
                            reset={reset}

                        />
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