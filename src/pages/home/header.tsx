import heroImg from '../../assets/logo-main.avif'

export default function Header() {
  return (
    <header>
      <div className="header container py-5 px-4 d-lg-flex">
        <div className="header-body d-flex flex-column justify-content-center">
          <h1 className="title-heading" id="title">
            Dynamic Discount
          </h1>
          <p className="title-description" id="description">
            Fill the details below and get personalised discount offer 🏆
          </p>
        </div>
        <figure className="figure header-image">
          <img className="p-sm-5 hero-img" src={heroImg} loading="lazy" alt="hero img" />
          <figcaption className="figure-caption affiliation-illustrations text-center">
            <a href="https://github.com/abhishekbijalwan" target="_blank">
              illustration by Abhishek
            </a>
          </figcaption>
        </figure>
      </div>
    </header>
  )
}
