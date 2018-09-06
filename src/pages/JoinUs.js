import React, { Component } from 'react';
import AppBody from 'components/AppBody';
import logo from 'resources/img/logo.png';
import 'resources/css/joinus.css';
class JoinUs extends Component {
  render() {
    return (
      <AppBody active={3}>
        <div
          style={{
            background:
              'linear-gradient(rgba(255, 255, 255, .9), rgba(255, 255, 255, 0.9)),url(' +
              logo +
              ') no-repeat center center',
            backgroundSize: 'contain',
          }}
        >
          <div style={{ padding: '10px' }} className="container">
            <div className="row">
              <div className="col-12">
                <h2> </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5>GSTIN: 29ADBPH1403Q1ZJ</h5>
              </div>
              <div className="col-md-4"> </div>
              <div className="col-md-4">
                <h5>DATE:{new Date().toLocaleDateString('en-IN')} </h5>
              </div>
            </div>
            <div className="row fp">
              <div className="col-md-2">
                <img src={logo} height="100" alt="Logo" />
              </div>
              <div className="uc text-left col-md-10">
                <h1 style={{ width: '100%', color: 'green' }}>Shramajeevi Agri Films</h1>
              </div>
            </div>
          </div>
          <div className="row text-justify">
            <div className="offset-md-2 col-md-8">
              <article>
                <h2>AgDial by Shramajeevi</h2>
                <p>
                  Shramajeevi is basically a visual media production house dedicated to agriculture. We have 2 YouTube
                  channels – Shramajeevi Agri Films and AgVid with 700+ videos – 1.4 lakh views per day and 1.6 lakh
                  subscribers. Our corporate website is <a href="https://shramajeevi.com">shramajeevi.com</a>. Our other
                  agriculture related websites are <a href="https://shramajeeviimages.com">shramajeeviimages.com</a>,{' '}
                  <a href="https://shramajeewiki.com">shramajeewiki.com</a>,{' '}
                  <a href="https://video.shramajeevi.com">video.shramajeevi.com</a>. We are preparing to launch a
                  satellite TV channel ‘Shramajeevi’ exclusive for agriculture in Kannada very soon under Shramajeevi
                  Television Pvt. Ltd. We had launched{' '}
                  <a href="https://shramajeevicontacts.com">shramajeevicontacts.com</a>, an agri directory website on
                  trial basis, some 2 years ago which became popular in very short time. We are happy to announce the
                  launch of commercial version of the same as <a href="https://agdial.in">agdial.in</a>, something like
                  Just Dial, exclusive for agriculture. In second phase we will come out with an E Commerce site
                  agtrade.in exclusive for agriculture.
                </p>
                <p>
                  There are many internet platforms catering almost all aspects of our life including something on
                  agriculture as well. But none of them are focusing agriculture domain. So, we decided to do that as
                  Shramajeevi is very popular on the internet for last one decade. Our agriculture documentaries in
                  Kannada, English and Hindi are popular enough across India, Sri Lanka and Bangladesh. Here we take
                  this opportunity to introduce another service web domain.
                </p>
                <span>
                  <h3>What is AgDial</h3>
                  <p>
                    It is an agriculture directory website or digital directory. It will enlist all segments of
                    agriculture viz. Agri Companies for Machinery & power tools, Manual implements, Seeds, Fertilizers,
                    Pesticides, Organic inputs etc., Agri Consultants, Services like Poly house, Dryers, Fence etc.,
                    Plant Nurseries, TC Labs, Animal Husbandry dealers for Rural birds, Cows, Buffalos, Goat, Sheep, Pig
                    etc., Irrigation equipment and related technologies, UASs, Research organizations, Government
                    departments, NGOs, Innovative farmers and many more. Enrolment charge varies on category
                    (company/individual, business segment etc.), space allotted (full page, a paragraph size, 3 lines),
                    extra features given (links for websites, video links, direct mail and call option etc.). AgDial
                    will have provisions for ads as well on its pages.
                  </p>
                </span>
                <div>
                  <h3>Branding Strategies for AgDial</h3>
                  <h4>Online Branding</h4>
                  <ul>
                    <li>
                      Promotional videos on our 2 YouTube channels with 140k+ views per day and 160k+ subscribers.
                    </li>
                    <li>
                      All 700+ videos on 2 YouTube channels will carry overlay and link in video description directing
                      traffic to AgDial.
                    </li>
                    <li>
                      Promotion and links on our existing websites. People visit{' '}
                      <a href="https://shramajeewiki.com">shramajeewiki.com</a> for knowledgeable articles on farming,{' '}
                      <a href="https://shramajeeviimages.com">shramajeeviimages.com</a> for agricultural and rural
                      images, <a href="https://video.shramajeevi.com">video.shramajeevi.com</a> for videos and{' '}
                      <a href="https://shramajeevi.com">shramajeevi.com</a>
                      to know more about Shramajeevi. Traffic will be driven from all those service domains to AgDial.
                    </li>
                    <li> Social media posts on Facebook, WhatsApp, Twitter etc.</li>
                    <li>
                      Shramajeevi is a familiar source of information on agriculture on Google and AgDial falls under
                      the same umbrella. So, Google search itself will generate sizable direct traffic to AgDial.
                    </li>
                    <li> Placing ads through Google Adwords.</li>
                  </ul>
                  <h4>Offline Branding</h4>
                  <ul>
                    <li>
                      Participation in all important Krushi Melas of the state to brand AgDial along with selling
                      Shramajeevi agricultural documentary DVDs.
                    </li>
                    <li>
                      Regular ads on agriculture supplementary pages of daily newspapers and agriculture magazines.
                    </li>
                    <li>
                      Writing knowledgeable articles on agriculture in supplementary pages of state level newspapers
                      with AgDial branding.
                    </li>
                    <li>
                      Free telecast of Shramajeevi agricultural documentaries on regional TV channels like Digvijay,
                      Saral Jeevan, Sri Sankara, Aayush etc. and local cable networks with AgDial branding in barter.
                    </li>
                    <li>
                      Production of live agriculture programs by Shramajeevi on a TV channel of the state for free to
                      brand AgDial in barter.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>AgTrade</h3>
                  <p>
                    In 2nd phase we plan to launch an independent E Commerce platform exclusive for agriculture -
                    AgTrade - agtrade.in linked with AgDial. Then the businesses listed on AgDial can sell their
                    products or services online directly to their customers.
                  </p>
                </div>
                <div>
                  <hr />
                  <h3>AgDial Enrolment Tariff</h3>
                  <div>
                    <h4>Premium</h4>
                    <p>
                      One paragraph space on listing page and one dedicated page with attractive design with full
                      address, telephone numbers, email address, website link, video links and other additional
                      features.
                    </p>
                    {/* <u>Tariff for one year</u> - &#8377; 50,000 + GST@18% */}
                  </div>
                  <div>
                    <hr /> <h4>Professional</h4>
                    <p>
                      One paragraph space with attractive design and a representative photo with full address, telephone
                      numbers, email address and video link.
                    </p>
                    {/* <u>Tariff for one year</u> - &#8377; 25,000 + GST@18% */}
                  </div>
                  <div>
                    <hr /> <h4>Basic</h4>
                    <p>Half paragraph text description containing full address, telephone numbers and email address.</p>
                    {/* <u>Tariff for one year</u> - &#8377; 10,000 + GST@18% */}
                  </div>
                  <div>
                    <hr />
                    <h3>Note</h3>
                    <ol>
                      <li> Attractive discount for pre-launch enrolment. </li>
                      <li> Bonus page-ads and attractive discounts on bulk enrolments by group of companies.</li>
                    </ol>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </AppBody>
    );
  }
}
export default JoinUs;
