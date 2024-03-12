// ** React
import { useState } from 'react';

// ** Bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap';

// ** Utils
import LocalStorage from 'utils/localStorage.util';

const MyFormComponent = ({handleCallbackApi}) => {
    
    // ** states
    const [categories, setCategories] = useState(['general', 'technology', 'sports', 'business', 'science', 'health', 'entertainment']);
    const [sources, setSources] = useState(['techcrunch', 'apple', 'tesla']);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSources, setSelectedSources] = useState([]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        LocalStorage.setItem("category", category)
    };

    const handlesourceChange = (source) => {
        setSelectedSources(source);
        LocalStorage.setItem("source", source)
        handleCallbackApi()
    };

    return (
        <Form style={{ width: "70%" }}>
            {selectedCategory ? (
                <>
                    <h4 className='text-white my-5'>Source</h4>
                    <p className='text-white my-5 text-start'>Please select your prefer Source</p>
                    <Row className="mb-3 justify-content-center">
                        {sources.map((source) => (
                            <Col key={source} className="mb-4" sm={12} md={6} lg={4}>
                                <Button onClick={() => handlesourceChange(source)}>{source}</Button>
                            </Col>
                        ))}
                    </Row>

                    <Button onClick={() => setSelectedCategory(null)} variant="warning">Back</Button>
                </>
            ) : (
                <>
                    <h4 className='text-white my-5'>Categories</h4>
                    <p className='text-white my-5 text-start'>Please select your prefer category</p>
                    <Row className="mb-3 justify-content-center">
                        {categories.map((category) => (
                            <Col key={category} className="mb-4" sm={12} md={6} lg={4}>
                                <Button onClick={() => handleCategoryChange(category)}>{category}</Button>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Form>
    );
};

export default MyFormComponent;
