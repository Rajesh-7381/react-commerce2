import axios from 'axios';

const fetchDataEntity = async () => {
    try {
        const responses = await Promise.all([
            axios.get("http://localhost:8081/countuser"),
            axios.get("http://localhost:8081/countadmin"),
            axios.get("http://localhost:8081/countsubadmin"),
            axios.get("http://localhost:8081/uniquecategories"),
            axios.get("http://localhost:8081/allproductcount"),
            axios.get("http://localhost:8081/AllBrandCount")
        ]);

        return {
            userCount: responses[0].data.count,
            adminCount: responses[1].data.Admincount,
            subAdminCount: responses[2].data.subaAdmincount,
            categoriesCount: responses[3].data.catcount,
            allProductCount: responses[4].data.productcount,
            allBrandCount: responses[5].data.Brandcount,
        };
    } catch (error) {
        console.error("Error fetching count data:", error);
        return null;
    }
};

export default fetchDataEntity;
