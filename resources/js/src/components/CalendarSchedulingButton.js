import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ApiHook from '../components/CustomHooks/ApiHook';

const CalendarSchedulingButton = () => {
  const scriptRef = useRef();
  const { t } = useTranslation();
  const [currentLanguage] = ApiHook();
  useEffect(() => {
    let script;

    const loadScript = () => {
      script = document.createElement('script');
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.async = true;
      script.onload = loadCalendarButton;
      scriptRef.current.innerHTML = '' 
      scriptRef.current.appendChild(script);
    };

    const loadCalendarButton = () => {
      window.calendar?.schedulingButton?.load({
        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1P3DYfyXG30a5Pm1AREixcY1SY7abFRpi4XUl4k6J_4YfgJJLPi3EtTL6eO-oWm0rv67sLgnmp?gv=true',
        color: '#EF6C00',
        label: t("form.book_an_appointment"),
        target: script,
      });
    };

    loadScript();

    return () => {
      // Cleanup if needed
      if (script) {
        scriptRef?.current?.removeChild(script);
      }
    };
  }, [currentLanguage]);

  return (
    <>
      <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet" />
      <div ref={scriptRef}></div>
    </>
  );
};

export default CalendarSchedulingButton;
