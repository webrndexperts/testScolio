import React, { useState } from 'react'

import IdImg1 from '../images/id-waiting.jpg';
import IdImg2 from '../images/id-front.jpg';
import IdImg3 from '../images/id-treatment.jpg';
import IdImg4 from '../images/id-gym.jpg';

import SgImg1 from '../images/sg-waiting.jpg';
import SgImg2 from '../images/sg-front.jpg';
import SgImg3 from '../images/sg-treatment.jpg';
import SgImg4 from '../images/sg-gym.jpg';

import MyImg1 from '../images/my-waiting.jpg';
import MyImg2 from '../images/my-front.jpg';
import MyImg3 from '../images/my-treatment.jpg';
import MyImg4 from '../images/my-gym.jpg';

const clinicsData = [
  {
    id: 1,
    name: "Orchard Road Singapore",
    images: [
      { id: 1, src: SgImg2, alt: "Clinic Reception" },
      { id: 2, src: SgImg1, alt: "Waiting Room" },
      { id: 3, src: SgImg3, alt: "Treatment Room" },
      { id: 4, src: SgImg4, alt: "Rehabilitation Gym" }
    ],
    lang: 'en_SG'
  },
  {
    id: 2,
    name: "Kuala Lumpur Malaysia ",
    images: [
      { id: 1, src: MyImg2 , alt: "Clinic Reception" },
      { id: 2, src: MyImg1 , alt: "Waiting Room" },
      { id: 3, src: MyImg3 , alt: "Treatment Room" },
      { id: 4, src: MyImg4 , alt: "Rehabilitation Gym" }
    ],
    lang: 'en_MY'
  },
  {
    id: 3,
    name: "Surabaya Indonesia",
    images: [
      { id: 1, src: IdImg2, alt: "Resepsionis Klinik" },
      { id: 2, src: IdImg1, alt: "Ruang tunggu" },
      { id: 3, src: IdImg3, alt: "Ruang perawatan" },
      { id: 4, src: IdImg4, alt: "Gym Rehabilitasi" }
    ],
    lang: 'id_ID'
  }
]

const ClinicTour = ({ currentLanguage }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  // Filter clinics based on currentLanguage
  const filteredClinics = clinicsData.filter(clinic => clinic.lang === currentLanguage)

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <div className="container clinic-info ">
        {filteredClinics.map((clinic) => (
          <div key={clinic.id} className="mb-5">
            <h3 className="text-center mb-4">{clinic.name}</h3>
            <div className="row">
              {clinic.images.map((image) => (
                <div key={image.id} className="col-md-3 col-sm-6 mb-3">
                  <div className="image-container text-center">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="img-fluid clinic-image"
                      onClick={() => openModal(image)}
                      style={{ cursor: 'pointer' }}
                    />
                     <h5>{image.alt}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <div
        className={`modal fade clinic-modal ${selectedImage ? 'show' : ''}`}
        style={{ display: selectedImage ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
        onClick={closeModal}
      >
        <div className="modal-dialog modal-lg" role="document" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedImage?.alt}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {selectedImage && (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="img-fluid"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedImage && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

export default ClinicTour
