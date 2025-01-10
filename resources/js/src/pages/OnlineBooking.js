import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";

import TopBanner from '../components/TopBanner'
import MetaCreator from '../components/MetaCreator'

const OnlineBooking = () => {
    const { t } = useTranslation();
    let metaProps = { title: t('page.online-booking') }
    return (
        <Fragment>
            <TopBanner title={t('page.online-booking')} />
            <MetaCreator {...metaProps} />

            <div className='custom-iframe'>
                <iframe
                    src="https://calendar.google.com/calendar/appointments/AcZssZ2ZSvJEdJjQgBwtDftJ1R_ne-M7HEtSlAg7fUk=?gv=true"
                    style={{ border: '0', width: '100%', height: '600', frameBorder: "0" }}
                />
            </div>
        </Fragment>
    )
}

export default OnlineBooking