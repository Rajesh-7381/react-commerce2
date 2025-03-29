import axios from 'axios';

const fetchDataEntity = async () => {
    const BASE_URL=process.env.REACT_APP_BASE_URL
    try {
        const responses = await Promise.all([
            axios.get(`${BASE_URL}/api/countuser`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}),
            axios.get(`${BASE_URL}/api/countadmin`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}),
            axios.get(`${BASE_URL}/api/countsubadmin`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}),
            axios.get(`${BASE_URL}/api/uniquecategories`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}),
            axios.get(`${BASE_URL}/api/allproductcount`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}),
            axios.get(`${BASE_URL}/api/AllBrandCount`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        ]);
        // console.log(responses[0])
        return {
            userCount: responses[0].data.userCount,
            adminCount: responses[1].data.adminCount,
            subAdminCount: responses[2].data.subAdminCount,
            categoriesCount: responses[3].data.catcount,
            allProductCount: responses[4].data.productcount,
            allBrandCount: responses[5].data.allBrandCount,
        };
    } catch (error) {
        console.error("Error fetching count data:", error);
        return null;
    }
};

export default fetchDataEntity;
