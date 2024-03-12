import moment from 'moment';
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles
import { categoryList } from 'utils/categories.util';
import NEWSAPISERVICE from 'services/newsapi.service'


const MyFormComponent = (props) => {
  const { startDate, setStartDate, endDate, setEndDate, category, setCategory, searchSource, setSearchSource, searchArticles, setSearchArticle, handleSubmit, reset } = props

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  return (
    <Form className="d-flex mt-4 mb-5" onSubmit={handleSubmit}>
      <Row className='w-100'>
        {searchSource == "" &&

          <Col xs={12} md={12} lg={3}>
            <Form.Control
              type="text"
              placeholder="Search Article"
              value={searchArticles}
              onChange={(e) => setSearchArticle(e.target.value)}
              className="form-control-lg  shadow-sm border-dark mt-xs-2 p-6"
            />
          </Col>
        }
        {searchArticles == "" &&
          <Col xs={12} md={12} lg={3}>
            <Form.Control
              type="text"
              placeholder="Enter Source"
              value={searchSource}
              onChange={(e) => setSearchSource(e.target.value)}
              className="form-control-lg  shadow-sm border-dark mt-xs-2"
            />
          </Col>
        }
        {(searchArticles !== "" || searchSource !== "") ?
          null :
          <>
            <Col xs={12} md={6} lg={3}>
              <Form.Select
                className="form-select-lg  mt-xs-2 shadow-sm border-dark"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categoryList.map((item, index) => (
                  <option key={index} value={item.value}>{item.label}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4} lg={3}>
              <DatePicker
                selectsRange
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                withPortal
                dateFormat="MMMM d, yyyy"
                placeholderText="Start Date and End Date"
                className="form-control-lg shadow-sm border-dark w-100 mt-xs-2"
              />
            </Col>
          </>}

        <Col xs={12} md={12} lg={3}>
          <Button
            className="btn custom-btn  shadow-sm"
            style={{ backgroundColor: "#005abb", color: "white", fontWeight: "700", padding: "8px 15px", borderColor: "#323762b7", fontSize: "20px", marginTop: searchArticles !== "" || searchSource !== "" ? "" : "20px" }}
            onClick={handleSubmit}
          >
            Search
          </Button>
          {startDate || endDate || category ||searchArticles||searchSource?
            <Button
              className="btn custom-btn  shadow-sm bg-danger text-white font-weight-bold  px-4 py-2"
              style={{ borderRadius: "6px", borderColor: "#323762b7", fontSize: "20px", marginLeft: "20px", marginTop: searchArticles !== "" || searchSource !== "" ? "" : "20px" }}
              onClick={reset}
            >
              Reset
            </Button>
            : null}
        </Col>
      </Row>
    </Form>
  );
};

export default MyFormComponent;
