import axios from 'axios';

const fetchDataEntity = async () => {
    try {
        const responses = await Promise.all([
            axios.get("http://localhost:8081/api/countuser"),
            axios.get("http://localhost:8081/api/countadmin"),
            axios.get("http://localhost:8081/api/countsubadmin"),
            axios.get("http://localhost:8081/api/uniquecategories"),
            axios.get("http://localhost:8081/api/allproductcount"),
            axios.get("http://localhost:8081/api/AllBrandCount")
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
