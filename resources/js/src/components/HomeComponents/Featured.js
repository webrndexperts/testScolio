import React from 'react'
import aca from '../../images/aca.webp';
import pic938Live from '../../images/pic938Live.webp';
import BeritaHarian from '../../images/berita-harian.webp';
import ShapeMagazine from '../../images/shape-magazine.webp';
import Lifestyle from '../../images/lifestyle.webp';
import TechInAsia from '../../images/tech-in-asia.webp';
import StraitsTimes from '../../images/straits-times.webp';
import Zaobao from '../../images/zaobao.webp';
import TodaysParent from '../../images/todays-parent.webp';
import Newicon from '../../images/newicon.webp';
import MedicalGrapevine from '../../images/medical-grapevine.webp';
import Ezyhealth from '../../images/ezyhealth.webp';
import cna from '../../images/cna.webp';
import Mediacrop from '../../images/mediacrop.webp';
import Pic123456 from '../../images/pic123456.webp';
import Apple from '../../images/apple-ios.webp';
import Amazon from '../../images/amazon.webp';
import GogglePlay from '../../images/google-play.webp';
import { useTranslation } from 'react-i18next';

const Featured = () => {
    const { t } = useTranslation();
    const imagePath = [Mediacrop, Apple, Amazon, GogglePlay, aca, pic938Live, Pic123456, BeritaHarian, cna, Ezyhealth, Lifestyle, MedicalGrapevine, Newicon, ShapeMagazine, StraitsTimes, TechInAsia, Zaobao, TodaysParent]
    return (
        <div className="logo-slider" data-aos="fade-down">
            <div className="container">
                <h2 >{t("newsletter-section.We Are Featured In")}</h2>
                <div className="slide-track">
                    {imagePath?.map((item, index) => {
                        return (
                            <div className="slide" key={index}>
                                <img src={item} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Featured
