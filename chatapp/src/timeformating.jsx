
 const time24Func = (hours,mins) => {
      if (hours >= 12 ) {
          
           if (hours % 12 === 0) {
                return (12 + ':' + mins + ' pm')
           }
           else {
                return ((hours % 12) + ':' + mins + ' pm')
           }
          }
          else  {
             return hours + ':'+ mins+' am'
          }
}
     
export const timeago = (date) => {
     
     const d = new Date(date)
     const d1 = new Date()
     const dayArray=['Mon','Tue','Wed','Thu','Fri','sat','Sun']
     const monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
     const getY = d1.getFullYear() - d.getFullYear()
     const getD = d1.getDate() - d.getDate()
     const getM = d1.getMonth()-d.getMonth() 
     console.log('get month',d1.getDate())
    
       
     if (getY === 0) {
          if (getM === 0) { 
               
           if (getD === 1) {
               
                return 'yesterday at ' + time24Func(d.getHours(), d.getMinutes()) 
          }
          else if (getD === 0) {
               
              return 'today at '+time24Func(d.getHours(),d.getMinutes())
               }
           else if (getD > 1) {
                return dayArray[d.getDate()]+' '+time24Func(d.getHours(),d.getMinutes())
          }
       
         
     }
          else if (getM > 0) {
               return d.getDate()+' '+ monthArray[d.getMonth()]+' '+time24Func(d.getHours(),d.getMinutes())
          }    
     }
     else if(getY>0) {
          return 'An year ago'
     }
     
}