import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import ApiHook from '../../components/CustomHooks/ApiHook';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials } from '../../reducers/resultsSlices';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Pagination from '../../components/Pagination';
import ReadLessMore from '../../components/ReadLessMore';
import TopBanner from '../../components/TopBanner';
import ReactPaginate from 'react-paginate';
import useDynamicTitle from '../../hooks/useDynamicTitle';

const Testimonials = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lang } = useParams();
    const { Testimonial } = useSelector((state) => state.testimonial);
    console.log("testimonial", Testimonial);
    const [currentLanguage, urlLanguage] = ApiHook();
    const [read,setRead]=useState(null)
    const [currentPage,setCurrentPage]=useState(0);

  
    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [currentLanguage, dispatch]);
    
    useEffect(() => {
        navigate(`${urlLanguage}/testimonials`)
    }, [currentLanguage, navigate])

   


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        // Perform any actions you need when the page changes
    };
    const itemsPerPage = 10;
    // const data = Array.from({ length: 50 }, (_, index) => index + 1);
    const pageCount = Math.ceil(Testimonial?.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = Testimonial?.slice(startIndex, endIndex);

    const readMore =(index)=>{
        if(read === index){
            setRead(null)
        }else{
            setRead(index)
        }
        
    }
    useDynamicTitle(t("main-nav.TESTIMONIALS"))
    return (
        <>
            <TopBanner title={t("main-nav.TESTIMONIALS")} />
            
            <div className="container">
                <Sidebar></Sidebar>
                <div className='main-article'>
                    <div className="row">
                        <div className='results-videos'>
                            {/* <ReactPlayer
                                url={Testimonial?Testimonial[0].video_url:""}
                              
                                controls
                            /> */}
                            <ReactPlayer
                            url={Testimonial && Testimonial.length > 0 ? Testimonial[0].video_url : ""}
                            controls
                        />
                        
                        </div>

                        {currentData?.map((item, i) => (
                            <div className={`testimonials-section ${(i%2 == 0) ? 'even' : 'odd'}`} key={item.id}>
                                <div className='testi-img'><img src={item.photo}/></div>
                                <div className='testi-details'>


                                    <ReadLessMore html={item.description} words={200} />

                                    {/*
                                    {read === item.id?
                                     <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                     :
                                     ""
                                    }
                                    <Link onClick={()=>readMore(item.id)}>Read more</Link>
                                    */}

                                    <h4>{item.title}</h4>
                                    <p>{item.company_name}</p>
                                </div>
                            </div>
                        ))}

                        <ReactPaginate 
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            containerClassName='pagination'
                            activeClassName='active'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonials
