import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";

// core components

const items = [
  {
    content: (
      <Card className="card-testimonial card-plain">
        <div className="card-avatar">
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img
              alt="..."
              className="img img-raised rounded"
              src="https://s3.amazonaws.com/creativetim_bucket/photos/154001/thumb.JPG?1501184024"
            ></img>
          </a>
        </div>
        <CardBody>
          <h5 className="card-description">
            "Awesome Design and very well organized code structure! Also, it
            contains numerous elements using which achieving the perfect or
            required template can be done with ease. Great job!"
          </h5>
          <CardTitle tag="h4">Stefan</CardTitle>
          <h6 className="category text-muted">Web Designer</h6>
          <CardFooter>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning"></i>
          </CardFooter>
        </CardBody>
      </Card>
    ),
    src: "0",
    altText: "",
    caption: "",
  },
  {
    content: (
      <Card className="card-testimonial card-plain">
        <div className="card-avatar">
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img
              alt="..."
              className="img img-raised rounded"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
            ></img>
          </a>
        </div>
        <CardBody>
          <h5 className="card-description">
            "It looks great and its somewhat futuristics cant wait to use it on
            a project here in nigeria i'm sure it would put me ahead.. I cant
            wait to hv enough money to buy ur product."
          </h5>
          <CardTitle tag="h4">Mr. Bones</CardTitle>
          <h6 className="category text-muted">Web Designer</h6>
          <CardFooter>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning"></i>
          </CardFooter>
        </CardBody>
      </Card>
    ),
    src: "1",
    altText: "",
    caption: "",
  },
  {
    content: (
      <Card className="card-testimonial card-plain">
        <div className="card-avatar">
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img
              alt="..."
              className="img img-raised rounded"
              src="https://s3.amazonaws.com/creativetim_bucket/photos/123124/thumb.?1480480048"
            ></img>
          </a>
        </div>
        <CardBody>
          <h5 className="card-description">
            "Everything is perfect. Codes are really organized. It's easy to
            edit for my own purposes. It's great that it is built on top of
            Bootstrap 4." <br></br>
            <br></br>
          </h5>
          <CardTitle tag="h4">DOĞA</CardTitle>
          <h6 className="category text-muted">Web Developer</h6>
          <CardFooter>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning mr-1"></i>
            <i className="fa fa-star text-warning"></i>
          </CardFooter>
        </CardBody>
      </Card>
    ),
    src: "2",
    altText: "",
    caption: "",
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <div
        className="section section-testimonials"
        data-background-color="black"
      >
        <Row>
          <Col className="ml-auto mr-auto text-center" md="8">
            <h2 className="title">Trusted by 818,000+ People</h2>
            <h5 className="description">
              The UI Kits, Templates and Dashboards that we've created are used
              by <b>818,000+ web developers</b> in over{" "}
              <b>1,476,616 Web Projects</b>. This is what some of them think:
            </h5>
          </Col>
        </Row>
        <Row>
          <Col md="2">
            <div className="testimonials-people">
              <img
                alt="..."
                className="left-first-person img-raised rellax"
                data-rellax-speed="1"
                src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
              <img
                alt="..."
                className="left-second-person img-raised rellax"
                data-rellax-speed="3"
                src="https://images.unsplash.com/photo-1577975819014-2d6f1e721e77?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
              <img
                alt="..."
                className="left-third-person img-raised rellax"
                data-rellax-speed="2"
                src="https://images.unsplash.com/photo-1605471395053-29a60b996ab4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZmFjZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
              <img
                alt="..."
                className="left-fourth-person img-raised rellax"
                data-rellax-speed="5"
                src="https://images.unsplash.com/photo-1593373986890-ea50b4dda788?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
              <img
                alt="..."
                className="left-fifth-person img-raised rellax"
                data-rellax-speed="7"
                src="https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZhY2V8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
            </div>
          </Col>
          <Col md="8">
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              />
              {items.map((item, key) => {
                return (
                  <CarouselItem
                    onExiting={onExiting}
                    onExited={onExited}
                    key={key}
                  >
                    {item.content}
                  </CarouselItem>
                );
              })}
              <a
                className="left carousel-control carousel-control-prev"
                data-slide="prev"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  previous();
                }}
                role="button"
              >
                <span className="now-ui-icons arrows-1_minimal-left" />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="right carousel-control carousel-control-next"
                data-slide="next"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                role="button"
              >
                <span className="now-ui-icons arrows-1_minimal-right" />
                <span className="sr-only">Next</span>
              </a>
            </Carousel>
          </Col>
          <Col md="2">
            <div className="testimonials-people">
              <img
                alt="..."
                className="right-first-person img-raised rellax"
                data-rellax-speed="5"
                src="https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGZhY2V8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
              <img
                alt="..."
                className="right-second-person img-raised rellax"
                data-rellax-speed="1"
                src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGZhY2V8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
              <img
                alt="..."
                className="right-fourth-person img-raised rellax"
                data-rellax-speed="7"
                src="https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGZhY2V8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
              <img
                alt="..."
                className="right-fifth-person img-raised rellax"
                data-rellax-speed="3"
                src="https://images.unsplash.com/photo-1552915170-9a8007c66041?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZmFjZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              ></img>
              <img
                alt="..."
                className="right-sixth-person img-raised rellax"
                data-rellax-speed="5"
                src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
              ></img>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Testimonials;
