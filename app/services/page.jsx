import "./services.css"
import { BiCheck } from "react-icons/bi"
import { servicesData } from './servicesData'

const Services = () => {
  return (
    <section id='services'>
      <h5>What I Offer</h5>
      <h2>Services</h2>
      <div className="container services__container">
        {
          servicesData.map(service => {
            return (
              <div key={service.title} className="service">
                <div className="service__head">
                  <h3>{service.title}</h3>
                </div>
                <ul className='service__list'>
                  {
                    service.detailedServices.map(ser => {
                      return (
                        <li key={ser}>
                          <BiCheck className='service__list-icon' />
                          <p>{ser}</p>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Services