export const trimInputValues=(data)=>{
    const trimmedData ={};
    for(const key in data){
        if(data.hasOwnProperty(key)){
            const value = data[key];
            if(typeof value === 'string'){
                trimmedData[key] = value.trim();
            }else{
                trimmedData[key] = value;
            }
        }
    }
    return trimmedData;
}

export const scrollToTop =()=>{
    window.scrollTo({ top: 0, behavior: 'smooth', duration: 1000 });
}
