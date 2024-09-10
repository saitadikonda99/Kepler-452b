import "./page.css";
import HeroClub from "../../Assets/ZeroOne.JPG";
const club = () => {
  return (
    <div className="club-container">
      <div className="club-container-in">
        <div className="club-container-hero">
          <div className="club-container-hero-in">
            <img src={HeroClub} className="ClubHero" alt="" />
          </div>
        </div>
        <div className="club-container-main">
          <div className="club-container-main-in">
            <div className="club-container-main-in-heading">
              <div className="club-container-main-in-heading-in">
                <h1>ZeroOne Code Club</h1>
                <p>
                  ZeroOne is a dynamic community of aspiring developers who come
                  together to learn, collaborate and innovate; celebrates
                  innovation, curiosity, and creativity. It serves as an
                  immersive environment where students can connect with
                  like-minded individuals who share their passion for coding and
                  software development. The primary objective of ZeroOne is to
                  nurture a thriving coding culture within the university. It is
                  a place where beginners can seek guidance, and experienced
                  programmers can amplify their skills through mentoring and
                  fruitful collaborations. A central goal of ZeroOne is to
                  cultivate a thriving coding culture within the university,
                  creating a space where students not only sharpen their
                  technical skills but also develop crucial communication,
                  leadership, and project management abilities. Emphasizing
                  networking, teamwork, and collaboration, ZeroOne enables its
                  members to pool their talents on ambitious projects that
                  stretch the limits of their capabilities.
                </p>
              </div>
            </div>
          </div>
          <div className="club-container-main-domain"></div>
        </div>
      </div>
    </div>
  );
};

export default club;
