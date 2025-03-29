// StatusEntity.js
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export const StatusEntity = async (entityType, id, currentStatus, setData, data) => {
    const BASE_URL=process.env.REACT_APP_BASE_URL
    // console.log(entityType)
    // console.log(id)
    // console.log(setData)
    // console.log(data)
    try {
        const newStatus = currentStatus === 1 ? 0 : 1;
        let url = '';

        switch (entityType) {
           
            case 'ProductsImageStatus':
                url = `${BASE_URL}/api/handleproductImagesstatus/${id}`;
                break;

            case 'CategoryStatus':
                url = `${BASE_URL}/api/handlecategorystatus/${id}`;
                break;

            case 'BrandStatus':
                url = `${BASE_URL}/api/handlebrandstatus/${id}`;
                break;

            case 'BannerStatus':
                url = `${BASE_URL}/api/handlebannerstatus/${id}`;
                break;

            case 'CmsStatus':
                // console.log(id)
                url = `${BASE_URL}/api/handlecmsstatus/${id}`;
                break;

            case 'ProductStatus':
                url = `${BASE_URL}/api/handleproductstatus/${id}`;
                break;

            default:
                throw new Error('Invalid entity type');
        }

        await axios.put(url, { status: newStatus },{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});

        const updatedData = data.map(item => {
            if (item.id === id) { //here item.id means api providing data and their corresponding id  
                return { ...item, status: newStatus };
            }
            return item;
        });
        console.log(updatedData)
        setData(updatedData);
        NotificationManager.success(" Status updated successfully!");
    } catch (error) {
        console.error(error);
        NotificationManager.error(" An error occurred while updating the status.");
    }
};
