import intro_image from '../../assets/image.png'
import product_1 from '../../assets/img/logo-1.svg'
import product_2 from '../../assets/img/logo-2.svg'
import pattern_dot_1 from '../../assets/img/pattern-dot-1.svg'
import product_3 from '../../assets/img/logo-3.svg'
import logo_7 from '../../assets/img/logo-7.png'
import mapfornow_arrow_1 from '../../assets/img/ornament-38-2.svg'
import mapfornow_arrow_2 from '../../assets/img/ornament-38-5.svg'
import mapfornow_arrow_3 from '../../assets/img/ornament-38-6.svg'
import mapfornow_arrow_4 from '../../assets/img/ornament-38-7.svg'
import arrow_1 from '../../assets/img/ornament-82-1.png'
import arrow_2 from '../../assets/img/ornament-83-1.png'
import arrow_3 from '../../assets/img/ornament-84-1.png'
import arrow_4 from '../../assets/img/ornament-86-1.png'
import separator from '../../assets/img/separator.svg'
import strength_content_3 from '../../assets/img/unsplash-4ebhbxxckru.png'
import strength_content_2 from '../../assets/img/unsplash-eq2z9ay9wws.png'
import strength_content_5 from '../../assets/img/unsplash-fhnnjk1yj7y.png'
import strength_content_4 from '../../assets/img/unsplash-jibmsms4-ka.png'
import strength_content_1 from '../../assets/img/unsplash-ph4skrfgyy.png'
import './styles.css'
import { Link } from "react-router-dom";

const Aboutus = (): JSX.Element => {
  return (
      <div className="aboutus">
      <div className="container-wrapper">
        <div className="container-aboutus">
          <div className="team-intro-content">
            <div className="frame">
              <div className="large">GREEN DOTS</div>
              <p className="p">
                Green Dots is a platform that allows people to find and navigate nearby recycling collection points.
                While this solution helps everyone easily access current recycling points around their neighborhood, it
                also makes each individual a game-changer through additional features.
              </p>
              <Link to={"/"}>
              <div className="button-primary"><div className="label">Get started -&gt;</div></div>
              </Link>
            </div>
            <div className="div">
              <img className="pattern-dot" src={pattern_dot_1} />
              <img className="vector" src={intro_image}></img>
            </div>
          </div>
          <div className="something">
            <div className="component-wrapper">
              <Link to={"/"}>
                  <div className="component">
                      <img className="ornament" src={mapfornow_arrow_1} />
                      <div className="h-large">Map for now!</div>
                  </div>
              </Link>
            </div>
            <div className="div-wrapper">
            <Link to={"/"}>
              <div className="component-2">
                <img className="img" src={mapfornow_arrow_2} />
                <div className="text-wrapper">Map for now!</div>
              </div>
              </Link>
            </div>
          </div>
          <div className="project-description">
            <div className="large-2">What we offer</div>
            <div className="product-wrapper">
              <div className="product-descriptions">
                <div className="product-description">
                  <img className="logo" src={product_1} />
                  <div className="title"><div className="text-wrapper-2">AI Tool</div></div>
                  <div className="description">
                    <p className="text-wrapper-3">
                    The AI waste detection tool quickly recognizes and categorizes various types of waste based on images, 
                    while providing detailed information on recycling methods and recycling locations, saving time and effort in searching.
                    </p>
                    <div className="go-to"><div className="go-to-2"><Link to={"/tool"}>Go to AI Tool -&gt;</Link></div></div>
                  </div>
                </div>
                <div className="separator"><img className="separator-2" src={separator} /></div>
                <div className="product-description">
                  <img className="logo" src={product_2} />
                  <div className="title"><div className="text-wrapper-2">Search tool</div></div>
                  <div className="description">
                    <p className="text-wrapper-3">
                    A map-based tool for searching waste collection campaigns, enabling users to locate nearby initiatives, 
                    fostering community engagement in waste management.
                    </p>
                    <div className="go-to-wrapper"><div className="go-to-3"><Link to={"/"}>Go to Home page -&gt;</Link></div></div>
                  </div>
                </div>
                <div className="separator"><img className="separator-3" src={separator} /></div>
                <div className="product-description">
                  <img className="logo" src={product_3} />
                  <div className="title"><div className="text-wrapper-2">Rating and review</div></div>
                  <div className="description">
                    <p className="text-wrapper-3">
                    A rating and review feature allows users to provide feedback and rate waste collection campaigns, 
                    promoting transparency and accountability in waste management efforts.
                    </p>
                    <div className="go-to-wrapper"><div className="go-to-3"><Link to={"/"}>Go to Home page -&gt;</Link></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="strength-content">
            <div className="group">
              <div className="overlap-group">
                <div className="group-2">
                  <img className="ornament-2" src={arrow_1} />
                  <img className="ornament-3" src={arrow_2} />
                  <img className="ornament-4" src={arrow_3} />
                </div>
                <img className="ornament-5" src={arrow_4} />
              </div>
            </div>
            <div className="container-2">
              <div className="large-3">Why choose us?</div>
              <div className="container-3">
                <div className="div-2">
                  <div className="description-2">
                    <p className="text-wrapper-4">
                      Utilizing our waste collection campaign search tool brings significant benefits.
                      With the ability to search nationwide, from the smallest nooks and crannies to major locations, users can easily identify ongoing waste collection campaigns throughout the country. 
                      Our tool visually displays these campaigns on a map and continuously updates them in real-time, making it easier than ever for 
                      waste management organizations and individuals eager to participate to find each other effortlessly.
                    </p>
                  </div>
                  <div className="thumbnail"><img className="unsplash" src={strength_content_1} /></div>
                </div>
                <div className="div-2">
                  <div className="div-3"><img className="unsplash-2" src={strength_content_2} /></div>
                  <div className="description-2">
                    <p className="text-wrapper-5">
                    Our product saves time for campaign organizers and participants. Organizers can easily create campaign information with a few clicks, 
                    reaching a wide audience without the need for extensive advertising on scattered platforms. Participants can quickly and visually search for nearby campaigns, 
                    avoiding the hassle of outdated information on social media or general search engines.
                    </p>
                  </div>
                </div>
                <div className="div-2">
                  <div className="description-2">
                    <p className="text-wrapper-4">
                    Our product allows users to evaluate and rate campaigns, creating transparency and improved organization to enhance credibility. 
                    Additionally, it provides participants with the opportunity to share their reviews and feedback based on their experiences, 
                    while helping them discover high-quality and reliable campaigns that meet their expectations.
                    </p>
                  </div>
                  <div className="thumbnail"><img className="unsplash-2" src={strength_content_3} /></div>
                </div>
                <div className="div-2">
                  <div className="div-3"><img className="img-2" src={strength_content_4} /></div>
                  <div className="description-2">
                    <p className="text-wrapper-5">
                    Our AI-based waste classification tool empowers contributors to donate without prior knowledge of waste sorting. 
                    By leveraging the AI tool's predictions, individuals can confidently contribute their waste to the appropriate organization. 
                    This addresses a common barrier where people hesitate to donate because they are unsure about the type of waste they have or whether it is accepted by any organization. 
                    By eliminating this uncertainty, we encourage more individuals to actively participate in waste donation, ensuring their concerns for waste contribution are met.
                    </p>
                  </div>
                </div>
                <div className="div-2">
                  <div className="description-2">
                    <p className="text-wrapper-4">
                    Our platform enables organizers to create cost-effective campaigns, reaching participants without excessive advertising costs. 
                    With a user-friendly interface, efficient campaign setup and promotion are facilitated. By eliminating expensive advertising, 
                    resources can be allocated effectively for meaningful participant experiences. This fosters inclusivity, enabling a wider range of individuals to engage with campaigns and events. 
                    Our goal is to democratize the organizing process, ensuring impactful initiatives thrive irrespective of budget constraints.
                    </p>
                  </div>
                  <div className="thumbnail"><img className="img-2" src={strength_content_5} /></div>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="overlap-group">
                <div className="group-2">
                  <img className="ornament-2" src={arrow_1} />
                  <img className="ornament-3" src={arrow_2} />
                  <img className="ornament-4" src={arrow_3} />
                </div>
                <img className="ornament-5" src={arrow_4} />
              </div>
            </div>
          </div>
          <div className="something">
            <div className="component-wrapper">
            <Link to={"/"}>
              <div className="component">
                <img className="ornament" src={mapfornow_arrow_3} />
                <div className="h-large">Map for now!</div>
              </div>
              </Link>
            </div>
            <div className="div-wrapper">
            <Link to={"/"}>
              <div className="component-2">
                <img className="img" src={mapfornow_arrow_4} />
                <div className="text-wrapper">Map for now!</div>
              </div>
              </Link>
            </div>
          </div>
          <div className="team-content">
            <div className="large-4">Our team</div>
            <div className="team">
              <div className="element-team">
                <div className="div-3">
                  <div className="logo-wrapper"><img className="logo-2" src={logo_7} /></div>
                </div>
                <div className="details">
                  <div className="team-name-wrapper"><div className="team-name">Thanh Hương</div></div>
                  <div className="brief-description-wrapper">
                      <p className="brief-description">
                          Studying at the University of Information Technology.
                      </p>
                  </div>
                  <div className="contact-info-wrapper"><div className="contact-info">Website</div></div>
                </div>
              </div>
              <div className="element-team">
                <div className="div-3">
                  <div className="logo-wrapper"><img className="logo-2" src={logo_7} /></div>
                </div>
                <div className="details">
                  <div className="team-name-wrapper"><div className="team-name">Kim Uyên</div></div>
                  <div className="brief-description-wrapper">
                      <p className="brief-description">
                          Studying at the University of Information Technology.
                      </p>
                  </div>
                  <div className="contact-info-wrapper"><div className="contact-info">Website</div></div>
                </div>
              </div>
              <div className="element-team">
                <div className="div-3">
                  <div className="logo-wrapper"><img className="logo-2" src={logo_7} /></div>
                </div>
                <div className="details">
                  <div className="team-name-wrapper"><div className="team-name">Uyển Nhi</div></div>
                  <div className="brief-description-wrapper">
                    <p className="brief-description">
                      Studying at the University of Information Technology.
                    </p>
                  </div>
                  <div className="contact-info-wrapper"><div className="contact-info">Website</div></div>
                </div>
              </div>
              <div className="element-team">
                <div className="div-3">
                  <div className="logo-wrapper"><img className="logo-2" src={logo_7} /></div>
                </div>
                <div className="details">
                  <div className="team-name-wrapper"><div className="team-name">Thanh Mai</div></div>
                  <div className="brief-description-wrapper">
                      <p className="brief-description">
                          Studying at the University of Information Technology.
                      </p>
                  </div>
                  <div className="contact-info-wrapper"><div className="contact-info">Website</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;