import axios from 'axios'

const instance=axios.create({
     baseURL:"https://letschatt--application.herokuapp.com/api"
})        

export default instance