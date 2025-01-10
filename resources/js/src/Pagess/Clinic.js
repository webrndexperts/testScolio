import React, { useEffect } from 'react';
import { selectLanguage, setLanguage, selectUrlLanguage, setUrlLanguage } from '../reducers/languageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDynamicLanguage } from '../i18n';
import Sidebar from '../components/Sidebar';
import ImageRotator from '../components/ImageRotator';
import TopBanner from '../components/TopBanner';
import useDynamicTitle from '../hooks/useDynamicTitle';


function Clinic() {
    useDynamicLanguage();
    const { lang } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const currentLanguage = useSelector(selectLanguage);
    const urlLanguage = useSelector(selectUrlLanguage);
    const dispatch = useDispatch();
    
    // Define getImageData function before it's used
    const getImageData = (language) => {
        switch (language) {
            case 'en_SG':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-EN.png',
                    title: 'Take a tour of the state-of-the-art facilities at ScolioLife™',
                    maintitle: 'CLINIC TOUR',
                    para: "Welcome to ScolioLife™, where we’re committed to providing the most advanced non-surgical scoliosis correction and therapies available. Come take a tour of our state-of-the-art facilities and find out why we’re the leading provider in the industry. Our clinic boasts the latest and most advanced medical equipment, and our facilities are designed to treat scoliosis patients of all ages and conditions.At ScolioLife™, we understand that each patient’s journey is unique, which is why we offer a wide range of individualized treatment options. Our team of experienced and dedicated specialists will work with you to create a personalized treatment plan that’s tailored to your specific needs and goals.    We’re proud to offer the most cutting-edge techniques and technologies available, including the innovative ScolioAlign™ Brace system. Our commitment to staying at the forefront of the field means that our patients can always expect the very best in scoliosis treatment.        Don’t let scoliosis hold you back any longer. Come see why ScolioLife™ is the top choice for non-surgical scoliosis correction and therapies. Schedule your appointment today and start your journey to a healthier, more aligned you!",
                    c1: "Clinic Reception",
                    c2: "Treatment Room",
                    c3: "Rehabilitation Gym",
                    c4: "Waiting Room"
                };
            case 'es_ES':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-ES.png',
                    title: 'Haz un recorrido por las instalaciones de vanguardia en ScolioLife™',
                    maintitle: 'RECORRIDO POR LA CLÍNICA',
                    para: "Bienvenido a ScolioLife™, donde estamos comprometidos a proporcionar la más avanzada corrección y terapias no quirúrgicas disponibles. Ven a dar un recorrido por nuestras instalaciones de vanguardia y descube por qué somos el proveedor líder en la industria. Nuestra clínica cuenta con los últimos y más avanzados equipos médicos, y nuestras instalaciones están diseñadas para tratar a pacientes con escoliosis de todas las edades y condiciones. En ScolioLife™, entendemos que el viaje de cada paciente es único, por lo que ofrecemos una amplia gama de opciones de tratamiento individualizado. Nuestro equipo de experimentados y dedicados especialistas, trabajarán contigo para crear un plan de tratamiento personalizado que se adapte a tus necesidades y objetivos específicos.Estamos orgullosos de ofrecer la más avanzada tecnología y técnicas disponibles, incluido el innovador sistema de Aparato Ortopédico ScolioAlign™. Nuestro compromiso de mantenernos a la vanguardia en el campo significa que nuestros pacientes siempre pueden esperar lo mejor en el tratamiento de la escoliosis. Ven a ver por qué ScolioLife™ es la mejor opción de corrección y terapias no quirúrgicas para la escoliosis. ¡Programa tu cita hoy y comienza tu viaje a convertirte en una persona más saludable y con mejor postura!",
                    c1: "Recepción de la Clínica",
                    c2: "Sala de Tratamiento",
                    c3: "Gimnasio de Rehabilitación",
                    c4: "Sala de espera"
                };
            case 'fr_FR':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-FR.png',
                    title: 'Faites une visite des installations de pointe chez ScolioLife™.',
                    maintitle: 'VISITE DE LA CLINIQUE',
                    para: "Bienvenue chez ScolioLife™, où nous nous engageons à fournir la correction non chirurgicale de la scoliose et les thérapies les plus pointues qui soient. Venez faire un tour de nos installations de pointe et découvrez pourquoi nous sommes le premier fournisseur du secteur. Notre clinique dispose des équipements médicaux les plus récents et les plus avancés, et nos installations sont conçues pour traiter les patients atteints de scoliose de tous âges, avec tous types d’affections. Chez ScolioLife™, nous comprenons que le parcours de chaque patient est unique, c’est pourquoi nous proposons un large éventail d’options de traitement individualisées. Notre équipe de spécialistes expérimentés et dévoués travaillera avec vous pour créer un plan de traitement personnalisé adapté à vos besoins et objectifs spécifiques. Nous sommes fiers de proposer les techniques et technologies les plus pointues qui existent, notamment le système innovant d’orthèse ScolioAlign™. Notre engagement à rester à la tête du secteur signifie que nos patients peuvent toujours compter sur le meilleur traitement de la scoliose.   Ne laissez pas la scoliose vous retenir plus longtemps. Venez voir pourquoi ScolioLife™ est le premier choix en matière de correction et de thérapies non chirurgicales de la scoliose. Prenez rendez-vous dès aujourd’hui et commencez votre voyage vers une meilleure santé et un meilleur alignement de votre corps !",
                    c1: "Réception de la clinique",
                    c2: "Salle de soins",
                    c3: "Rééducation",
                    c4: "SALLE D'ATTENTE"
                };
            case 'id_ID':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-ID.png',
                    title: 'Ikuti room tur ke fasilitas tercanggih di ScolioLife™',
                    maintitle: 'TUR KLINIK',
                    para: "Selamat datang di ScolioLife™, tempat di mana kami berkomitmen untuk memberikan pemulihan dan terapi skoliosis non-bedah tercanggih yang tersedia saat ini. Ayo ikuti tur ke fasilitas canggih kami dan cari tahu mengapa kami menjadi penyedia layanan kesehatan terkemuka di industri ini. Klinik kami menawarkan peralatan medis terbaru dan tercanggih, dan fasilitas kami dirancang untuk merawat pasien skoliosis dari segala usia dan kondisi.Di ScolioLife™, kami memahami bahwa perjalanan setiap pasien adalah unik, oleh karena itu kami menawarkan berbagai pilihan perawatan individual. Tim spesialis kami yang berpengalaman dan berdedikasi akan bekerja sama dengan Anda untuk membuat rencana perawatan yang dipersonalisasi dan telah disesuaikan dengan kebutuhan serta tujuan khusus Anda. Kami bangga menawarkan teknik dan teknologi paling canggih yang tersedia saat ini, termasuk sistem Penyangga ScolioAlign™ yang inovatif. Komitmen kami untuk tetap menjadi yang terdepan dalam bidang ini agar para pasien kami selalu dapat mengharapkan yang terbaik dalam perawatan skoliosis. Jangan biarkan skoliosis menahan Anda lebih lama lagi. Mari lihat mengapa ScolioLife™ adalah pilihan utama untuk pemulihan dan terapi skoliosis non-bedah. Jadwalkan janji temu Anda hari ini dan mulailah perjalanan Anda menuju diri Anda yang lebih sehat dan selaras!",
                    c1: "Resepsionis Klinik",
                    c2: "Ruang perawatan",
                    c3: "Gym Rehabilitasi",
                    c4: "Ruang tunggu"
                };
            case 'it_IT':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-IT.png',
                    title: 'Fai Un Tour Tra Le Strutture All’avanguardia Di Scoliolife™',
                    maintitle: 'DOMANDE FREQUENTI SULLA CHIROPRATICA',
                    para: "Benvenuti in ScolioLife™, dove c’impegniamo nel fornire la correzione non chirurgica della scoliosi più avanzata e le terapie che sono disponibili. Vieni a fare un tour tra le nostre strutture all’avanguardia e scopri il perché siamo il fornitore leader nel settore. La nostra clinica ha le attrezzature mediche più recenti e avanzate e le nostre strutture sono progettate per trattare i pazienti affetti da scoliosi di tutte le età e condizioni. Presso la ScolioLife™, siamo consapevoli che il viaggio di ogni paziente è unico, motivo per cui offriamo una vasta gamma di opzioni di trattamento personalizzate. Il nostro team di specialisti esperti e dedicati lavorerà con te per porre in essere un piano di trattamento personalizzato su misura per le tue esigenze e obiettivi specifici. Siamo orgogliosi di offrire le tecniche e le tecnologie più all’avanguardia tra quelle disponibili, tra cui l’innovativo sistema Tutore ScolioAlign™. Il nostro impegno a rimanere all’avanguardia nel settore vuol dire che i nostri pazienti possono sempre aspettarsi il meglio nel trattamento della scoliosi. Non lasciare più che la scoliosi ti sia d’impedimento. Vieni a scoprire il perché ScolioLife™ è la scelta migliore per la correzione e le terapie non chirurgiche della scoliosi. Fissa il tuo appuntamento oggi stesso e inizia il tuo viaggio verso un te più sano e più allineato!",
                    c1: "Reception della Clinica",
                    c2: "Sala Trattamenti",
                    c3: "Palestra per la Riabilitazione  ",
                    c4: "Sala D'Attesa"
                };
            case 'es_MX':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-ES.png',
                    title: 'Haz un recorrido por las instalaciones de vanguardia en ScolioLife™',
                    maintitle: 'RECORRIDO POR LA CLÍNICA',
                    para: "Bienvenido a ScolioLife™, donde estamos comprometidos a proporcionar la más avanzada corrección y terapias no quirúrgicas disponibles. Ven a dar un recorrido por nuestras instalaciones de vanguardia y descube por qué somos el proveedor líder en la industria. Nuestra clínica cuenta con los últimos y más avanzados equipos médicos, y nuestras instalaciones están diseñadas para tratar a pacientes con escoliosis de todas las edades y condiciones. En ScolioLife™, entendemos que el viaje de cada paciente es único, por lo que ofrecemos una amplia gama de opciones de tratamiento individualizado. Nuestro equipo de experimentados y dedicados especialistas, trabajarán contigo para crear un plan de tratamiento personalizado que se adapte a tus necesidades y objetivos específicos.Estamos orgullosos de ofrecer la más avanzada tecnología y técnicas disponibles, incluido el innovador sistema de Aparato Ortopédico ScolioAlign™. Nuestro compromiso de mantenernos a la vanguardia en el campo significa que nuestros pacientes siempre pueden esperar lo mejor en el tratamiento de la escoliosis. Ven a ver por qué ScolioLife™ es la mejor opción de corrección y terapias no quirúrgicas para la escoliosis. ¡Programa tu cita hoy y comienza tu viaje a convertirte en una persona más saludable y con mejor postura!                    ",
                    c1: "Recepción de la Clínica",
                    c2: "Sala de Tratamiento",
                    c3: "Gimnasio de Rehabilitación",
                    c4: "Sala de espera"
                };
                case 'de_DE':
                    return {
                        imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-DE.png',
                        title: 'Machen Sie einen Rundgang durch die hochmodernen Einrichtungen von ScolioLife™',
                        maintitle: 'RUNDGANG KLINIK',
                        para: "Willkommen bei ScolioLife™, wo wir uns verpflichtet haben, die fortschrittlichsten nicht-chirurgischen Skoliosekorrekturen und -therapien anzubieten. Machen Sie einen Rundgang durch unsere hochmodernen Einrichtungen und finden Sie heraus, warum wir der führende Anbieter in der Branche sind. Unsere Klinik ist mit den neuesten und fortschrittlichsten medizinischen Geräten ausgestattet, und unsere Einrichtungen sind für die Behandlung von Skoliosepatienten jeden Alters und Zustands ausgelegt. Wir bei ScolioLife™ wissen, dass jeder Patient seinen eigenen Weg geht, und bieten daher eine breite Palette an individuellen Behandlungsmöglichkeiten. Unser Team aus erfahrenen und engagierten Spezialisten erstellt gemeinsam mit Ihnen einen persönlichen Behandlungsplan, der auf Ihre speziellen Bedürfnisse und Ziele zugeschnitten ist.Wir sind stolz darauf, die modernsten Techniken und Technologien anbieten zu können, darunter das innovative ScolioAlign™ Korsett-System. Unser Engagement, immer an der Spitze des Fachgebiets zu stehen, bedeutet, dass unsere Patienten immer das Beste in der Skoliosebehandlung erwarten können. Lassen Sie sich nicht länger von Skoliose zurückhalten. Überzeugen Sie sich, warum ScolioLife™ die erste Wahl für nicht-chirurgische Skoliosekorrekturen und -therapien ist. Vereinbaren Sie noch heute einen Termin und beginnen Sie Ihre Reise zu einem gesünderen, besser ausgerichteten Menschen! ",
                        c1: "Klinik-Empfang ",
                        c2: "Behandlungsraum",
                        c3: "Reha-Fitnessraum ",
                        c4: "Wartezimmer "
                    };
            case 'zh_CN':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-CS.png',
                    title: '快来参观我们的设施以了解为什么scoliolife诊所是非手术脊柱侧弯矫正和治疗的领先提供商。',
                    maintitle: '参观SCOLIOLIFE诊所',
                    para: "",
                    c1: "诊所接待处",
                    c2: "治疗室",
                    c3: "康复健身房",
                    c4: "等候室"
                };
            case 'zh_HK':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-CT.png',
                    title: '來看看ScolioLife™最先進的設施',
                    maintitle: '診所參觀診所參觀',
                    para: "歡迎來到ScolioLife™。在這裏，我們將提供最先進的非手術性脊柱側彎矯正和治療。快來參觀我們最先進的設施以了解為什麽我們是業內領先的供應商吧。我們的診所擁有最新和最先進的醫療設備，且其主旨在於治療各種年齡和條件的脊柱側彎患者。 在ScolioLife™裏, 我們了解到每個患者的治療過程都是獨一無二的，所以我們提供了廣泛的個性化治療選擇。這些將由我們經驗豐富且敬業的專家所組成的團隊與您合作，並且根據您的具體需求和目標來製定一份為你量身定製的治療計劃。 我們可以很驕傲的說我們能為您夠提供最頂級尖端的技術，包括創新的ScolioAlign™ 支具系統。我們致力於保持在該領域的最領先，以讓我們的患者始終可以期待脊柱側彎治療的最佳效果。 別再讓脊柱側彎耽誤您的生活了。快來看看為什麽ScolioLife™ 是非手術性脊柱側彎矯正和治療的首選。現在就來安排您的預約，並開啟可以讓您更快樂和健康的旅程吧！",
                    c1: "诊所接待处",
                    c2: "治疗室",
                    c3: "康复健身房",
                    c4: "等候室"
                };
            case 'ja_JP':
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-JP.png',
                    title: 'ScolioLife™ (スコリオライフ) の最先端設備を見学しよう',
                    maintitle: 'SCOLIOLIFEクリニック バーチャルツアー',
                    para: "ScolioLife™ (スコリオライフ) へようこそ。私たちは最先端の非外科的脊柱側弯症矯正および療法を提供することに尽力しています。私たちの最先端設備を見学し、どうして私たちが業界有数のクリニックであるかをお確かめください。当クリニックは最新式で最先端の医療機器を備えており、その設備はあらゆる年齢層および症状の脊柱側弯症の患者さんをケアするよう設計されています。 ScolioLife™では、患者さんの体験がひとりひとり異なっていることを理解しています。私たちが個人に合わせた治療オプションを幅広く提供しているのはそのためです。経験豊富で献身的な専門家チームが、あなた独自のニーズと目標に合わせて個別のケアプランを作成します。 私たちは、革新的なScolioAlign™ (スコリオアライン) 装具システムを含む最先端のテクニックとテクノロジーを提供していることを誇りに思っています。常にこの分野の最先端に留まるべく尽力していますから、当クリニックの患者さんにはいつでも最善の側弯症療法を期待していただけます。 これ以上、脊柱側弯症にあなたの行動を制限させてはなりません。ScolioLife™がなぜ非外科的側弯症矯正および療法のための最高の選択であるか、ご自身でお確かめください。今日予約を入れ、より健康でまっすぐなあなたをめざす旅を始めましょう！",
                    c1: "クリニック待合室",
                    c2: "施療室",
                    c3: "リハビリジム",
                    c4: "等候室"
                };
            default:
                return {
                    imageUrl: 'https://sladmin.scoliolife.com/uploads/2023/08/Clinic-Tour-EN.png',
                    title: 'Take a tour of the state-of-the-art facilities at ScolioLife™',
                    maintitle: 'CLINIC TOUR',
                    para: "Welcome to ScolioLife™, where we’re committed to providing the most advanced non-surgical scoliosis correction and therapies available. Come take a tour of our state-of-the-art facilities and find out why we’re the leading provider in the industry. Our clinic boasts the latest and most advanced medical equipment, and our facilities are designed to treat scoliosis patients of all ages and conditions.At ScolioLife™, we understand that each patient’s journey is unique, which is why we offer a wide range of individualized treatment options. Our team of experienced and dedicated specialists will work with you to create a personalized treatment plan that’s tailored to your specific needs and goals.    We’re proud to offer the most cutting-edge techniques and technologies available, including the innovative ScolioAlign™ Brace system. Our commitment to staying at the forefront of the field means that our patients can always expect the very best in scoliosis treatment.        Don’t let scoliosis hold you back any longer. Come see why ScolioLife™ is the top choice for non-surgical scoliosis correction and therapies. Schedule your appointment today and start your journey to a healthier, more aligned you!",
                    c1: "Clinic Reception",
                    c2: "Treatment Room",
                    c3: "Rehabilitation Gym",
                    c4: "Waiting Room"
                };
        }
    };

    useEffect(() => {
        const navigateToAboutUS = () => {
            navigate(`${urlLanguage}/tour-our-clinic`);
        };

        if (typeof lang != 'undefined' && lang !== currentLanguage) {
            dispatch(setUrlLanguage(i18n.language));
            dispatch(setLanguage(i18n.language));
            navigateToAboutUS();
        }

        if(typeof lang == 'undefined') {
            dispatch(setUrlLanguage('en_US'));
            dispatch(setLanguage('en_US'));
            navigateToAboutUS();
        }
    }, [i18n.language, currentLanguage, dispatch, navigate, lang, urlLanguage]);

    // Retrieve image URL and title using getImageData function
    const { imageUrl, title, maintitle, para, c1, c2, c3, c4 } = getImageData(currentLanguage);
    useDynamicTitle(maintitle);

    return (
        <>
            <TopBanner title={maintitle} />
            
            <div className="about-section">
                <div className="container">
                    <Sidebar />
                    <div className='about'>
                        <div>
                            <div className="elementor-widget-container">
                                <img loading="lazy" alt="" decoding="async" width="660" height="390" src={imageUrl} />
                            </div>
                            <div className="clinic">
                                <div className="container">
                                    <h2>{title}</h2>
                                    <p>{para}</p></div>
                            </div>
                        </div> 

                        <div className='conatainer'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='c-t'>
                                        <div className='image-c1'> 
                                            <ImageRotator id='rotatorCount1' image='Img2' />
                                            <h1 className="Bone-Spur">{c1}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='c-t'>
                                        <div className='image-c1'> 
                                            <ImageRotator id='rotatorCount2' image='Img3' />
                                            <h1 className="Bone-Spur">{c2}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div className='row'>
                                <div className='col-md-6'>
                                        <div className='c-t'>
                                            <div className='image-c1'> 
                                                <ImageRotator id='rotatorCount3' image='Img4' />
                                                <h1 className="Bone-Spur">{c3}</h1>
                                            </div>
                                        </div>
                                    </div>
                                <div className='col-md-6'>
                                    <div className='c-t'>
                                        <div className='image-c1'> 
                                            <ImageRotator id='rotatorCount4' image='Img1' />
                                            <h1 className="Bone-Spur">{c4}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Clinic;
